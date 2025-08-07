// scripts/ai_committer.mjs
import { exec } from 'child_process';
import fs from 'fs/promises';
import path from 'path';
import { minimatch } from 'minimatch';

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

async function getStagedFiles() {
    const stagedOutput = await run('git diff --cached --name-only');
    return stagedOutput ? stagedOutput.split('\n') : [];
}

async function groupFiles(files, commitGroups) {
    const grouped = {};
    const allFiles = new Set(files);

    for (const file of allFiles) {
        let assigned = false;
        for (const group of commitGroups) {
            if (group.patterns.some(pattern => minimatch(file, pattern))) {
                if (!grouped[group.name]) {
                    grouped[group.name] = { files: [], messagePrefix: group.messagePrefix, description: group.description };
                }
                grouped[group.name].files.push(file);
                assigned = true;
                break; // Assign to the first matching group
            }
        }
        if (!assigned) {
            // Assign to a default 'chore' group if no specific group matches
            if (!grouped.chore) {
                const choreGroup = commitGroups.find(g => g.name === 'chore');
                grouped.chore = { files: [], messagePrefix: choreGroup ? choreGroup.messagePrefix : 'chore:', description: choreGroup ? choreGroup.description : 'Other changes.' };
            }
            grouped.chore.files.push(file);
        }
    }
    return grouped;
}

async function runCommitter() {
    console.log('Starting AI Committer...');

    // 1. Compile graph to get commit groups
    console.log(`Compiling ${GRAPH_SOURCE}...`);
    await run(`jsonnet -J ${PROJECT_GRAPH_DIR} --ext-str timestamp='${new Date().toISOString()}' -o ${COMPILED_GRAPH} ${GRAPH_SOURCE}`);
    const graph = JSON.parse(await fs.readFile(COMPILED_GRAPH, 'utf-8'));
    const commitGroups = graph.commitGroups; // Access the new commitGroups field

    if (!commitGroups || commitGroups.length === 0) {
        console.error('Error: No commit groups defined in project_graph.jsonnet.');
        await fs.unlink(COMPILED_GRAPH);
        return;
    }

    // 2. Get staged files
    const stagedFiles = await getStagedFiles();
    if (stagedFiles.length === 0) {
        console.log('No staged changes to commit. Please stage files using `git add`.');
        await fs.unlink(COMPILED_GRAPH);
        return;
    }

    // 3. Group staged files
    const groupedFiles = await groupFiles(stagedFiles, commitGroups);

    // 4. Create commits for each group
    console.log('\nCreating commits...');
    for (const groupName in groupedFiles) {
        const { files, messagePrefix, description } = groupedFiles[groupName];
        if (files.length === 0) continue;

        const fileList = files.map(f => `  - ${f}`).join('\n');
        const commitMessage = `${messagePrefix} ${description}\n\n${fileList}`;

        console.log(`\nCommitting group: ${groupName}`);
        console.log(`  Files: ${files.join(', ')}`);
        console.log(`  Message: ${commitMessage.split('\n')[0]}...`);

        // Unstage all files first to ensure atomic commits
        await run('git reset');
        // Stage only the files for the current group
        await run(`git add ${files.join(' ')}`);
        // Commit the files
        await run(`git commit -m "${commitMessage}"`);
        console.log(`  Successfully committed group: ${groupName}`);
    }

    // 5. Ensure all files are unstaged after committing
    await run('git reset');

    // 6. Cleanup
    await fs.unlink(COMPILED_GRAPH);
    console.log('\nAI Committer finished successfully.');
}

runCommitter().catch(error => {
    console.error('\nAI Committer failed:', error);
    // Attempt to clean up compiled graph even on error
    fs.unlink(COMPILED_GRAPH).catch(() => {}); 
});