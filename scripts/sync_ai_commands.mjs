// scripts/sync_ai_commands.mjs
import { exec } from 'child_process';
import fs from 'fs/promises';
import path from 'path';

const PROJECT_ROOT = process.cwd();
const PROJECT_GRAPH_DIR = path.join(PROJECT_ROOT, 'project_graph');
const GRAPH_SOURCE = path.join(PROJECT_GRAPH_DIR, 'project_graph.jsonnet');
const COMPILED_GRAPH = path.join(PROJECT_GRAPH_DIR, 'graph.json');

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

async function syncAiCommands() {
    console.log('Starting AI Command Synchronizer...');

    // 1. Compile graph to get AI commands data
    console.log(`Compiling ${GRAPH_SOURCE}...`);
    await run(`jsonnet -J ${PROJECT_GRAPH_DIR} --ext-str timestamp='${new Date().toISOString()}' -o ${COMPILED_GRAPH} ${GRAPH_SOURCE}`);
    const graph = JSON.parse(await fs.readFile(COMPILED_GRAPH, 'utf-8'));
    const aiCommands = graph.aiCommands;

    if (!aiCommands || !aiCommands.platforms || !aiCommands.commands) {
        console.error('Error: AI commands data not found in project_graph.jsonnet.');
        await fs.unlink(COMPILED_GRAPH);
        return;
    }

    // 2. Iterate through platforms and update their config files
    for (const platformKey in aiCommands.platforms) {
        const platform = aiCommands.platforms[platformKey];
        const configPath = path.join(PROJECT_ROOT, platform.configPath);
        let content = '';

        console.log(`\nSynchronizing commands for ${platform.name} at ${configPath}...`);

        // Construct content based on platform type
        if (platformKey === 'gemini') {
            content += `# Operational Guidelines\n\n## Tool Usage\n\n`;
            for (const cmd of aiCommands.commands) {
                const triggerPhrasesJoined = cmd.triggerPhrases.map(p => `"${p}"`).join(" or ");
                content += `- **Command Aliases:** When the user requests ${triggerPhrasesJoined}, execute \`${cmd.npmCommand}\`.\n`;
            }
        } else { // For Cursor, Roo, Kilocode (similar markdown structure)
            content += `# Custom Project Commands\n\n`;
            for (const cmd of aiCommands.commands) {
                const nameFormatted = cmd.name.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
                content += `## ${nameFormatted}\n`;
                content += `- **Trigger Phrase:** "${cmd.triggerPhrases[0]}"\n`;
                content += `- **Action:** Run \`${cmd.npmCommand}\`\n`;
                content += `- **Description:** ${cmd.description}\n\n`;
            }
        }

        // Write content to file
        try {
            await fs.writeFile(configPath, content);
            console.log(`Successfully updated ${platform.name} config.`);
        } catch (error) {
            console.error(`Failed to write to ${configPath}: ${error.message}`);
        }
    }

    // 3. Cleanup
    await fs.unlink(COMPILED_GRAPH);
    console.log('\nAI Command Synchronizer finished successfully.');
}

syncAiCommands().catch(error => {
    console.error('\nAI Command Synchronizer failed:', error);
    fs.unlink(COMPILED_GRAPH).catch(() => {}); 
});
