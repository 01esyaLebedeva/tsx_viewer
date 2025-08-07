// _graph_parts/entities.jsonnet
// This part defines the core entities of the project.

local templates = import 'templates.jsonnet';
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
    'src/App.tsx': {
        type: 'ReactComponent',
        path: 'src/App.tsx',
        purpose: 'The main application component, defines the overall layout and routes.',
        metadata: Metadata(0.8, 'Gemini-1.5-Pro', 'Auto-generated from audit'),
    },
    'src/i18n.ts': {
        type: 'I18nConfiguration',
        path: 'src/i18n.ts',
        purpose: 'Internationalization setup using i18next.',
        metadata: Metadata(0.8, 'Gemini-1.5-Pro', 'Auto-generated from audit'),
    },
    'src/icons/tsx_viewer.ico': {
        type: 'Asset',
        path: 'src/icons/tsx_viewer.ico',
        purpose: 'Application icon in ICO format.',
        metadata: Metadata(0.8, 'Gemini-1.5-Pro', 'Auto-generated from audit'),
    },
    'src/icons/tsx_viewer.png': {
        type: 'Asset',
        path: 'src/icons/tsx_viewer.png',
        purpose: 'Application icon in PNG format.',
        metadata: Metadata(0.8, 'Gemini-1.5-Pro', 'Auto-generated from audit'),
    },
    'src/index.css': {
        type: 'Styling',
        path: 'src/index.css',
        purpose: 'Global CSS styles for the application.',
        metadata: Metadata(0.8, 'Gemini-1.5-Pro', 'Auto-generated from audit'),
    },
    'src/main.tsx': {
        type: 'EntryPoint',
        path: 'src/main.tsx',
        purpose: 'The main entry point for the React application.',
        metadata: Metadata(0.8, 'Gemini-1.5-Pro', 'Auto-generated from audit'),
    },
    'src/tsx_viewer.desktop': {
        type: 'DesktopEntry',
        path: 'src/tsx_viewer.desktop',
        purpose: 'Desktop entry file for Linux systems.',
        metadata: Metadata(0.8, 'Gemini-1.5-Pro', 'Auto-generated from audit'),
    },
    'src/window.d.ts': {
        type: 'TypeScriptDefinition',
        path: 'src/window.d.ts',
        purpose: 'TypeScript declaration file for window object.',
        metadata: Metadata(0.8, 'Gemini-1.5-Pro', 'Auto-generated from audit'),
    },
    'electron/main.js': {
        type: 'ElectronMainProcess',
        path: 'electron/main.js',
        purpose: 'The main process for the Electron application.',
        metadata: Metadata(0.8, 'Gemini-1.5-Pro', 'Auto-generated from audit'),
    },
    'electron/preload.js': {
        type: 'ElectronPreloadScript',
        path: 'electron/preload.js',
        purpose: 'Preload script for the Electron application, used for secure IPC.',
        metadata: Metadata(0.8, 'Gemini-1.5-Pro', 'Auto-generated from audit'),
    },
    'test/emoji.json': {
        type: 'TestData',
        path: 'test/emoji.json',
        purpose: 'Test data in JSON format.',
        metadata: Metadata(0.8, 'Gemini-1.5-Pro', 'Auto-generated from audit'),
    },
    'test/simple-test.tsx': {
        type: 'TestFile',
        path: 'test/simple-test.tsx',
        purpose: 'A simple test file for a React component.',
        metadata: Metadata(0.8, 'Gemini-1.5-Pro', 'Auto-generated from audit'),
    },
    'test/test-component.tsx': {
        type: 'TestComponent',
        path: 'test/test-component.tsx',
        purpose: 'A React component used for testing purposes.',
        metadata: Metadata(0.8, 'Gemini-1.5-Pro', 'Auto-generated from audit'),
    },
    'test/workout_program.tsx': {
        type: 'TestFile',
        path: 'test/workout_program.tsx',
        purpose: 'A test file for a workout program component.',
        metadata: Metadata(0.8, 'Gemini-1.5-Pro', 'Auto-generated from audit'),
    },
    'test/workout_program_emoji.tsx': {
        type: 'TestFile',
        path: 'test/workout_program_emoji.tsx',
        purpose: 'A test file for a workout program component with emojis.',
        metadata: Metadata(0.8, 'Gemini-1.5-Pro', 'Auto-generated from audit'),
    },
    'public/index.html': {
        type: 'HTML',
        path: 'public/index.html',
        purpose: 'The main HTML file for the application.',
        metadata: Metadata(0.8, 'Gemini-1.5-Pro', 'Auto-generated from audit'),
    },
    'public/locales/en/translation.json': {
        type: 'Locale',
        path: 'public/locales/en/translation.json',
        purpose: 'English translation file.',
        metadata: Metadata(0.8, 'Gemini-1.5-Pro', 'Auto-generated from audit'),
    },
    'public/locales/ru/translation.json': {
        type: 'Locale',
        path: 'public/locales/ru/translation.json',
        purpose: 'Russian translation file.',
        metadata: Metadata(0.8, 'Gemini-1.5-Pro', 'Auto-generated from audit'),
    },
    // ... other entities
}