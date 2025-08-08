// graph_parts/meta.jsonnet
// This part defines the graph's own structure and rules.

{
    description: 'This section is self-referential. It defines the structure and usage policies of the project_graph.jsonnet file itself, enabling any AI to understand how to interpret it.',
    
    entities: {
      'project_graph.jsonnet': {
        type: 'MetaGraphFile',
        purpose: 'The root file that imports all graph parts to provide a holistic, machine-readable representation of the project.',
      },
      'graph_parts/': {
        type: 'MetaDirectory',
        purpose: 'Contains the modular parts of the project graph.',
      },
      'scripts/graph_auditor.mjs': {
        type: 'UtilityScript',
        purpose: 'Audits the project graph by comparing its file-based entities against the actual file system, reporting any discrepancies.',
        interactions: [
            { type: 'EXECUTES', target: 'jsonnet' },
            { type: 'READS', target: 'project_graph.jsonnet' },
            { type: 'SCANS', target: 'FileSystem' },
        ],
      },
      'scripts/ai_committer.mjs': {
        type: 'UtilityScript',
        purpose: 'Automates the creation of atomic commits by grouping changed files based on rules defined in projectPolicies.commitGroups.',
        interactions: [
            { type: 'READS', target: 'projectPolicies.commitGroups' },
            { type: 'EXECUTES', target: 'git' },
        ],
      },
      'graph_parts/templates.jsonnet': {
        type: 'MetaTemplateFile',
        purpose: 'Defines reusable helper functions (templates) for creating entities within the graph, ensuring consistency.',
      },
      'metadata_block': {
        type: 'MetaConcept',
        purpose: 'A block attached to an entity to describe the confidence, authorship, and rationale of the information presented.',
      },
    },
    
    projectPolicies: {
      graphUsagePolicy: {
        rule: 'An AI assistant MUST read and parse this entire file, including all imported parts, at the beginning of a session. The assistant MUST consider the `metadata` block of each entity to assess the reliability of the information.',
        appliesTo: ['AIAssistant'],
      },
    },
}