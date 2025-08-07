// project_graph.jsonnet
// Version: 1.6
// Root file for the project graph. It imports and assembles all modular parts.

{
    schemaVersion: '1.6',
    projectName: 'tsx_viewer',
    description: 'TSX viewer and editor application, supporting both web and Electron environments.',

    meta: (import '_graph_parts/meta.jsonnet'),

    entities: (import '_graph_parts/entities.jsonnet'),

    projectPolicies: (import '_graph_parts/policies.jsonnet'),
}