// project_graph.jsonnet
// Version: 1.7
// Root file for the project graph. It imports and assembles all modular parts.

{
    schemaVersion: '1.7',
    projectName: 'tsx_viewer',
    projectUrl: 'https://github.com/01esyaLebedeva/tsx_viewer',
    description: 'TSX viewer and editor application, supporting both web and Electron environments.',

    meta: (import '_graph_parts/meta.jsonnet'),

    entities: import '_graph_parts/entities.jsonnet',

    // Relationships between entities
    relations: import '_graph_parts/relations.jsonnet',

    // Policies and conventions
    policies: import '_graph_parts/policies.jsonnet',
}