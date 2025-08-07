// _graph_parts/policies.jsonnet
// This part defines project-wide development policies.

{
    documentationSync: {
      rule: 'All changes to user-facing features or the build process must be documented in both the primary README.md and all localized versions (e.g., README.ru.md).',
      files: ['README.md', 'README.ru.md'],
    },
    releaseNotesUpdate: {
      rule: 'All significant changes, new features, and bug fixes must be added to RELEASE_NOTES.md under the correct version.',
      files: ['RELEASE_NOTES.md'],
    },
    memoryBankUpdate: {
        rule: 'The memory-bank must be updated to reflect the high-level context and \'why\' behind significant changes, following the structure defined in .cursor/rules/memory-bank.mdc.',
        files: ['memory-bank/'],
    },

    commitGroups: {
        docs: {
          prefix: 'docs',
          description: 'Changes related to user-facing documentation.',
          patterns: ['*.md', '*.mdc'],
        },
        rules: {
          prefix: 'chore(rules)',
          description: 'Changes to AI assistant rule files.',
          patterns: ['.gemini/**', '.cursor/**', '.kilocode/**', '.roo/**'],
        },
        graph: {
            prefix: 'chore(graph)',
            description: 'Changes to the project graph system itself.',
            patterns: ['project_graph.jsonnet', '_graph_parts/**', 'scripts/graph*.mjs'],
        },
        core: {
          prefix: 'feat',
          description: 'Core application source code changes.',
          patterns: ['src/**', 'electron/**'],
        },
        build: {
            prefix: 'build',
            description: 'Changes to build configuration and dependencies.',
            patterns: ['package.json', 'package-lock.json', 'tsconfig.json', 'vite.config.ts', 'tailwind.config.js'],
        },
    },
}