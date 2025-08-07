// _graph_parts/entities.jsonnet
// This part defines the core entities of the project.

local templates = import '../_graph_parts/templates.jsonnet';
local Metadata = templates.Metadata;
local Component = templates.Component;
local IpcChannel = templates.IpcChannel;

{
    // --- Config & Manifest Files ---
    'package.json': {
        type: 'PackageManagementFile',
        path: 'package.json',
        purpose: 'Defines project metadata, scripts, dependencies, and build configurations.',
        metadata: Metadata(1.0, 'Gemini-1.5-Pro'),
        sections: [
            { name: 'scripts', purpose: 'Defines command-line scripts for development, building, and starting the app.' },
            { name: 'dependencies', purpose: 'Lists runtime libraries required by the application.' },
            { name: 'devDependencies', purpose: 'Lists libraries needed for development and building, but not for runtime.' },
            { name: 'build', purpose: 'Configuration for electron-builder to package the application for different OS.' },
        ],
    },
    // ... other entities
}