// scripts/ai_committer.mjs
import { exec } from 'child_process';
import fs from 'fs/promises';
import path from 'path';
import { minimatch } from 'minimatch';

const GRAPH_SOURCE = 'project_graph.jsonnet';
const COMPILED_GRAPH = 'graph.json';

// Function to run shell commands
const run = (cmd) => new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
        if (error) return reject(error);
        resolve(stdout.trim());
    });
});

async function getChangedFiles() {
    const statusOutput = await run('git status --porcelain');
    if (!statusOutput) return [];
    return statusOutput.split('\n').map(line => line.slice(3));
}

async function groupFiles(files, groups) {
    const grouped = {};
    const groupOrder = Object.keys(groups);

    for (const file of files) {
        let assigned = false;
        for (const groupName of groupOrder) {
            const group = groups[groupName];
            if (group.patterns.some(pattern => minimatch(file, pattern))) {
                if (!grouped[groupName]) {
                    grouped[groupName] = [];
                }
                grouped[groupName].push(file);
                assigned = true;
                break; // Assign to the first matching group
            }
        }
        if (!assigned) {
            if (!grouped.core) grouped.core = [];
            grouped.core.push(file); // Default to core group
        }
    }
    return grouped;
}

async function runCommitter() {
    console.log('Starting AI Committer...');

    // 1. Compile graph
    await run(`jsonnet -J . -o ${COMPILED_GRAPH} ${GRAPH_SOURCE}`);
    const graph = JSON.parse(await fs.readFile(COMPILED_GRAPH, 'utf-8'));
    const commitGroups = graph.projectPolicies.commitGroups;

    // 2. Get changed files
    const changedFiles = await getChangedFiles();
    if (changedFiles.length === 0) {
        console.log('No changes to commit.');
        await fs.unlink(COMPILED_GRAPH);
        return;
    }

    // 3. Group files
    const groupedFiles = await groupFiles(changedFiles, commitGroups);

    // 4. Create commits for each group
    console.log('\nCreating commits...');
    for (const groupName in groupedFiles) {
        const files = groupedFiles[groupName];
        const groupInfo = commitGroups[groupName];
        const prefix = groupInfo.prefix;
        const fileList = files.map(f => `  - ${f}`).join('\n');

        console.log(`\nCommitting group: ${groupName}`);
        await run(`git add ${files.join(' ')}`);
        const message = `${prefix}: Update ${groupName} files\n\n${fileList}`;
        await run(`git commit -m "${message}"`);
        console.log(`  - Committed with message: ${prefix}: Update ${groupName} files`);
    }

    // 5. Cleanup
    await fs.unlink(COMPILED_GRAPH);
    console.log('\nAI Committer finished successfully.');
}

runCommitter().catch(error => {
    console.error('\nAI Committer failed:', error);
});
