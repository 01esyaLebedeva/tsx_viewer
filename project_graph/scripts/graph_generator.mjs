// scripts/graph_generator.mjs
import { exec } from 'child_process';
import fs from 'fs/promises';
import path from 'path';
import minimatch from 'minimatch';

const PROJECT_ROOT = process.cwd();
const PROJECT_GRAPH_DIR = path.join(PROJECT_ROOT, 'project_graph');
const GRAPH_SOURCE = path.join(PROJECT_GRAPH_DIR, 'project_graph.jsonnet');
const COMPILED_GRAPH = path.join(PROJECT_GRAPH_DIR, 'graph.json');
const AUDIT_DIRECTORIES = ['src', 'electron', 'test', 'public'];
const README_PATH = path.join(PROJECT_GRAPH_DIR, 'README.md');
const SETTINGS_PATH = path.join(PROJECT_GRAPH_DIR, 'settings.json');
const MEMORY_BANK_DIR = path.join(PROJECT_ROOT, 'memory-bank');

// Function to run shell commands
const run = (cmd, options = {}) => new Promise((resolve, reject) => {
    exec(cmd, options, (error, stdout, stderr) => {
        if (error) {
            console.error(`Command failed: ${cmd}\nError: ${error.message}\nStdout: ${stdout}\nStderr: ${stderr}`);
            return reject(error);
        }
        resolve(stdout.trim());
    });
});

async function getAllFiles(dirPath, arrayOfFiles = []) {
    const files = await fs.readdir(dirPath);

    for (const file of files) {
        const fullPath = path.join(dirPath, file);
        const stat = await fs.stat(fullPath);
        if (stat.isDirectory()) {
            await getAllFiles(fullPath, arrayOfFiles);
        } else {
            arrayOfFiles.push(fullPath);
        }
    }
    return arrayOfFiles;
}

async function generateSettingsFile(graph) {
    console.log('Checking for project_graph/settings.json...');
    const defaultSettingsTemplate = graph.templates.ProjectSettings();
    const settingsFilePath = path.join(PROJECT_ROOT, defaultSettingsTemplate.settingsFileMetadata.filePath);

    try {
        await fs.access(settingsFilePath);
        console.log('project_graph/settings.json already exists. Skipping generation.');
    } catch (error) {
        console.log('project_graph/settings.json not found. Generating default settings...');
        
        let updateMemoryBankOnAuditOption = { ...defaultSettingsTemplate.options.update_memory_bank_on_audit };

        try {
            const stats = await fs.stat(MEMORY_BANK_DIR);
            if (stats.isDirectory()) {
                updateMemoryBankOnAuditOption.value = true; // Set to true if memory-bank directory exists
                console.log('Memory-bank directory detected. Setting update_memory_bank_on_audit to true.');
            }
        } catch (memBankError) {
            console.log('Memory-bank directory not found. update_memory_bank_on_audit remains default.');
        }

        const settingsContent = JSON.stringify({
            settingsFileMetadata: defaultSettingsTemplate.settingsFileMetadata,
            options: {
                audit_after_commit: defaultSettingsTemplate.options.audit_after_commit,
                update_memory_bank_on_audit: updateMemoryBankOnAuditOption,
            },
        }, null, 2);

        await fs.writeFile(settingsFilePath, settingsContent);
        console.log(`Generated default settings file at ${settingsFilePath}`);
    }
}

async function generateReadme(graph) {
    let existingReadmeContent = '';
    try {
        existingReadmeContent = await fs.readFile(README_PATH, 'utf-8');
    } catch (error) {
        console.warn(`Could not read existing README.md: ${error.message}. Creating new one.`);
    }

    let aiCommandsSection = '\n## AI Assistant Command Mapping\n\n';
    aiCommandsSection += 'To streamline interaction with AI assistants, you can configure them to trigger `npm run graph:audit` and `npm run graph:commit` using simpler, more conversational commands. Below are examples of how to set this up for various AI assistants, based on the definitions in `graph_parts/ai_commands.jsonnet`.\n\n';
    aiCommandsSection += '**Important:** The exact syntax and capabilities may vary between AI assistants. Refer to your specific AI\'s documentation for precise configuration details.\n\n';

    if (graph.aiCommands && graph.aiCommands.platforms) {
        for (const platformKey in graph.aiCommands.platforms) {
            const platform = graph.aiCommands.platforms[platformKey];
            aiCommandsSection += `### For ${platform.name} (\`${platform.configPath}\`)\n\n`;
            aiCommandsSection += '```markdown\n';
            for (const cmd of graph.aiCommands.commands) {
                let line = '';
                if (platformKey === 'gemini') {
                    const triggerPhrasesJoined = cmd.triggerPhrases.map(p => `\"${p}\"`).join(" or ");
                    line = `- **Command Aliases:** When the user requests ${triggerPhrasesJoined}, execute \`${cmd.npmCommand}\`.`;
                } else {
                    line = `## ${cmd.name.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')}\n- **Trigger Phrase:** \"${cmd.triggerPhrases[0]}\"\n- **Action:** Run \`${cmd.npmCommand}\`\n- **Description:** ${cmd.description}\n`;
                }
                aiCommandsSection += line + '\n';
            }
            aiCommandsSection += '```\n\n';
        }
    }

    const sectionHeader = '## AI Assistant Command Mapping';
    const startIndex = existingReadmeContent.indexOf(sectionHeader);

    let newReadmeContent;
    if (startIndex !== -1) {
        // Replace existing section
        const endIndex = existingReadmeContent.indexOf('## ', startIndex + sectionHeader.length);
        if (endIndex !== -1) {
            newReadmeContent = existingReadmeContent.substring(0, startIndex) + aiCommandsSection + existingReadmeContent.substring(endIndex);
        } else {
            newReadmeContent = existingReadmeContent.substring(0, startIndex) + aiCommandsSection;
        }
    } else {
        // Append new section
        newReadmeContent = existingReadmeContent + aiCommandsSection;
    }

    await fs.writeFile(README_PATH, newReadmeContent);
    console.log(`Generated ${README_PATH}`);
}

async function performAudit(graph, fileList = null) {
    console.log('\n--- Performing Project Graph Audit ---');
    const graphEntities = new Set(Object.keys(graph.entities));

    let filesToAudit = [];
    if (fileList) {
        filesToAudit = fileList;
    } else {
        for (const dir of AUDIT_DIRECTORIES) {
            const files = await getAllFiles(dir);
            filesToAudit.push(...files);
        }
    }

    const missingFromGraph = [];
    filesToAudit.forEach(file => {
        if (!graphEntities.has(file)) {
            missingFromGraph.push(file);
        }
    });

    const missingFromProject = [];
    graphEntities.forEach(entityPath => {
        // Only check entities that look like file paths and are in the audit directories
        if (entityPath.includes('/') && AUDIT_DIRECTORIES.some(dir => entityPath.startsWith(dir))) { 
            if (!filesToAudit.includes(entityPath)) {
                missingFromProject.push(entityPath);
            }
        }
    });

    if (missingFromGraph.length === 0 && missingFromProject.length === 0) {
        console.log('[OK] Graph is in sync with the the audited files.');
    } else {
        if (missingFromGraph.length > 0) {
            console.log('\n[WARNING] Files exist in project but are MISSING from the graph:');
            missingFromGraph.forEach(file => console.log(`  - ${file}`));
        }
        if (missingFromProject.length > 0) {
            console.log('\n[WARNING] Entities in graph but file does NOT EXIST in the audited scope:');
            missingFromProject.forEach(file => console.log(`  - ${file}`));
        }
        console.log('\nPlease update project_graph/graph_parts/entities.jsonnet to resolve these discrepancies.');
    }
    console.log('----------------------------------');

    // Read settings to decide on memory-bank update
    try {
        const settingsContent = await fs.readFile(SETTINGS_PATH, 'utf-8');
        const settings = JSON.parse(settingsContent);

        if (settings.options.update_memory_bank_on_audit.value) {
            const logEntry = `Audit performed on ${new Date().toISOString()}. Scope: ${fileList ? 'Committed Files' : 'Full Project'}. Status: ${missingFromGraph.length === 0 && missingFromProject.length === 0 ? 'OK' : 'WARNINGS'}.\n`;
            await fs.appendFile(path.join(MEMORY_BANK_DIR, 'audit_logs.md'), logEntry);
            console.log('Audit results logged to memory-bank/audit_logs.md');
        }
    } catch (settingsError) {
        console.warn(`Could not read settings.json or update memory-bank: ${settingsError.message}`);
    }
}

async function runGenerator() {
    console.log('Starting Project Graph Generator...');

    // 1. Compile Jsonnet to JSON
    console.log(`Compiling ${GRAPH_SOURCE}...`);
    await run(`jsonnet -J ${PROJECT_GRAPH_DIR} --ext-str timestamp='${new Date().toISOString()}' -o ${COMPILED_GRAPH} ${GRAPH_SOURCE}`);
    const graph = JSON.parse(await fs.readFile(COMPILED_GRAPH, 'utf-8'));

    // 2. Generate settings.json if it doesn't exist
    await generateSettingsFile(graph);

    // 3. Generate README.md
    await generateReadme(graph);

    // 4. Perform Full Audit
    await performAudit(graph);

    // 5. Cleanup
    await fs.unlink(COMPILED_GRAPH);
    console.log('\nProject Graph Generator finished successfully.');
}

runGenerator().catch(error => {
    console.error('\nProject Graph Generator failed:', error);
    fs.unlink(COMPILED_GRAPH).catch(() => {}); 
});