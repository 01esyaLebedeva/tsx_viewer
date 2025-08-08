// graph_parts/entities.jsonnet
// This part defines the core entities of the project.

local templates = import 'templates.jsonnet';
local Metadata = templates.Metadata;
local Component = templates.Component;
local IpcChannel = templates.IpcChannel;
local FileEntity = templates.FileEntity;
local DefaultMetadata = templates.DefaultMetadata;

{
    // --- Config & Manifest Files ---
    'package.json': FileEntity(
        'PackageManagementFile',
        'package.json',
        'Defines project metadata, scripts, dependencies, and build configurations.',
        Metadata(1.0, 'Gemini-1.5-Pro')
    ) + {
        sections: [
            { name: 'scripts', purpose: 'Defines command-line scripts for development, building, and starting the app.' },
            { name: 'dependencies', purpose: 'Lists runtime libraries required by the application.' },
            { name: 'devDependencies', purpose: 'Lists libraries needed for development and building, but not for runtime.' },
            { name: 'build', purpose: 'Configuration for electron-builder to package the application for different OS.' },
        ],
    },

    // --- Project Graph System Files ---
    'ProjectGraphAgent/project_graph.jsonnet': FileEntity(
        'JsonnetConfiguration',
        'ProjectGraphAgent/project_graph.jsonnet',
        'Root configuration file for the project graph system.',
        DefaultMetadata()
    ),
    'ProjectGraphAgent/README.md': FileEntity(
        'Documentation',
        'ProjectGraphAgent/README.md',
        'Main documentation for the project graph system.',
        DefaultMetadata()
    ),
    'ProjectGraphAgent/LLM_GUIDELINES.md': FileEntity(
        'Documentation',
        'ProjectGraphAgent/LLM_GUIDELINES.md',
        'Guidelines for Large Language Models on how to interpret and utilize the project graph system.',
        DefaultMetadata()
    ),

    // --- Example Source Files (replace with your project's files) ---
    'src/App.tsx': Component(
        name='App.tsx',
        path='src/App.tsx',
        purpose='The main application component, defines the overall layout and routes.',
        metadata=DefaultMetadata()
    ),
    'src/main.tsx': FileEntity(
        kind='EntryPoint',
        path='src/main.tsx',
        purpose='The main entry point for the React application.',
        metadata=DefaultMetadata()
    ),
    'src/index.css': FileEntity(
        kind='Styling',
        path='src/index.css',
        purpose='Global CSS styles for the application.',
        metadata=DefaultMetadata()
    ),

    // --- Example Test Files ---
    'test/example.test.tsx': FileEntity(
        kind='TestFile',
        path='test/example.test.tsx',
        purpose='Example test file for React components.',
        metadata=DefaultMetadata()
    ),

    // --- Example Public Files ---
    'public/index.html': FileEntity(
        kind='HTML',
        path='public/index.html',
        purpose='The main HTML file for the application.',
        metadata=DefaultMetadata()
    ),

    // --- Example Configuration Files ---
    'tsconfig.json': FileEntity(
        kind='TypeScriptConfiguration',
        path='tsconfig.json',
        purpose='TypeScript configuration file.',
        metadata=DefaultMetadata()
    ),
    '.gitignore': FileEntity(
        kind='GitConfiguration',
        path='.gitignore',
        purpose='Git ignore rules for the project.',
        metadata=DefaultMetadata()
    ),
    'README.md': FileEntity(
        kind='Documentation',
        path='README.md',
        purpose='Main project documentation.',
        metadata=DefaultMetadata()
    ),
}