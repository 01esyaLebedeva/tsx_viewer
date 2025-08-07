// scripts/graph_auditor.mjs
import { exec } from 'child_process';
import fs from 'fs/promises';
import path from 'path';

const PROJECT_ROOT = process.cwd();
const PROJECT_GRAPH_DIR = path.join(PROJECT_ROOT, 'project_graph');
const GRAPH_SOURCE = path.join(PROJECT_GRAPH_DIR, 'project_graph.jsonnet');
const COMPILED_GRAPH = path.join(PROJECT_GRAPH_DIR, 'graph.json');
const AUDIT_DIRECTORIES = ['src', 'electron', 'test', 'public'];

// Helper function to recursively get all file paths
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

async function runAudit() {
    console.log('Starting Project Graph Audit...');

    // 1. Compile Jsonnet to JSON
    console.log(`Compiling ${GRAPH_SOURCE}...`);
    await new Promise((resolve, reject) => {
        const timestamp = new Date().toISOString();
        exec(`jsonnet -J ${PROJECT_GRAPH_DIR} --ext-str timestamp='${timestamp}' -o ${COMPILED_GRAPH} ${GRAPH_SOURCE}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Jsonnet compilation failed: ${stderr}`);
                reject(error);
                return;
            }
            resolve(stdout);
        });
    });
    console.log('Compilation successful.');

    // 2. Read the compiled graph
    const graphContent = await fs.readFile(COMPILED_GRAPH, 'utf-8');
    const graph = JSON.parse(graphContent);
    const graphEntities = new Set(Object.keys(graph.entities));

    // 3. Get all files from the project
    const projectFiles = new Set();
    for (const dir of AUDIT_DIRECTORIES) {
        const files = await getAllFiles(dir);
        files.forEach(file => projectFiles.add(file));
    }

    // 4. Compare and find discrepancies
    const missingFromGraph = [];
    projectFiles.forEach(file => {
        if (!graphEntities.has(file)) {
            missingFromGraph.push(file);
        }
    });

    const missingFromProject = [];
    graphEntities.forEach(entityPath => {
        // We only check entities that look like file paths
        if (entityPath.includes('/')) { 
            if (!projectFiles.has(entityPath)) {
                missingFromProject.push(entityPath);
            }
        }
    });

    // 5. Report results
    console.log('\n--- Project Graph Audit Report ---');
    if (missingFromGraph.length === 0 && missingFromProject.length === 0) {
        console.log('[OK] Graph is in sync with the project files.');
    } else {
        if (missingFromGraph.length > 0) {
            console.log('\n[WARNING] Files exist in project but are MISSING from the graph:');
            missingFromGraph.forEach(file => console.log(`  - ${file}`));
        }
        if (missingFromProject.length > 0) {
            console.log('\n[WARNING] Entities in graph but file does NOT EXIST in the project:');
            missingFromProject.forEach(file => console.log(`  - ${file}`));
        }
        console.log('\nPlease update project_graph/_graph_parts/entities.jsonnet to resolve these discrepancies.');
    }
    console.log('----------------------------------');

    // 6. Cleanup
    await fs.unlink(COMPILED_GRAPH);
}

runAudit().catch(error => {
    console.error('Audit failed unexpectedly:', error);
});
