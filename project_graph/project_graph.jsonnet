// project_graph.jsonnet
// Version: 1.7
// Root file for the project graph. It imports and assembles all modular parts.

{
    schemaVersion: '1.7',
    projectName: 'tsx_viewer',
    projectUrl: 'https://github.com/01esyaLebedeva/tsx_viewer',
    description: 'TSX viewer and editor application, supporting both web and Electron environments.',

    meta: (import 'graph_parts/meta.jsonnet'),

    entities: import 'graph_parts/entities.jsonnet',

    // Relationships between entities
    relations: import 'graph_parts/relations.jsonnet',

    // Policies and conventions
    policies: import 'graph_parts/policies.jsonnet',

    // AI Command Mappings
    aiCommands: import 'graph_parts/ai_commands.jsonnet',

    // Commit Grouping Rules for AI Committer
    commitGroups: [
        {
            name: 'feat',
            patterns: [
                'src/**/*.tsx',
                'src/**/*.ts',
                'electron/**/*.js',
            ],
            messagePrefix: 'feat:',
            description: 'New feature or significant enhancement.',
        },
        {
            name: 'fix',
            patterns: [
                'src/**/*.tsx',
                'src/**/*.ts',
                'electron/**/*.js',
            ],
            messagePrefix: 'fix:',
            description: 'Bug fix.',
        },
        {
            name: 'docs',
            patterns: [
                '**/*.md',
                'docs/**',
            ],
            messagePrefix: 'docs:',
            description: 'Documentation only changes.',
        },
        {
            name: 'style',
            patterns: [
                'src/**/*.css',
                'tailwind.config.js',
                'postcss.config.cjs',
            ],
            messagePrefix: 'style:',
            description: 'Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc).',
        },
        {
            name: 'refactor',
            patterns: [
                'src/**/*.tsx',
                'src/**/*.ts',
                'electron/**/*.js',
            ],
            messagePrefix: 'refactor:',
            description: 'A code change that neither fixes a bug nor adds a feature.',
        },
        {
            name: 'test',
            patterns: [
                'test/**',
            ],
            messagePrefix: 'test:',
            description: 'Adding missing tests or correcting existing tests.',
        },
        {
            name: 'build',
            patterns: [
                'package.json',
                'package-lock.json',
                'vite.config.ts',
                'electron-builder.json',
                'snapcraft.yaml',
                'flatpak.yml',
            ],
            messagePrefix: 'build:',
            description: 'Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm).',
        },
        {
            name: 'ci',
            patterns: [
                '.github/**',
            ],
            messagePrefix: 'ci:',
            description: 'Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs).',
        },
        {
            name: 'chore',
            patterns: [
                '.gitignore',
                '.vscode/**',
                '.cursorrules',
                '.gemini/**',
                '.kilocode/**',
                '.roo/**',
                'scripts/**',
                'public/**',
            ],
            messagePrefix: 'chore:',
            description: "Other changes that don't modify src or test files.",
        },
        {
            name: 'revert',
            patterns: [], // Revert commits typically reference a previous commit hash
            messagePrefix: 'revert:',
            description: 'Reverts a previous commit.',
        },
    ],
}