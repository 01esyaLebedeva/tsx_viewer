// _graph_parts/meta.jsonnet
// This part defines the graph's own structure and rules.

{
    description: 'This section is self-referential. It defines the structure and usage policies of the project_graph.jsonnet file itself, enabling any AI to understand how to interpret it.',
    
    entities: {
      'project_graph.jsonnet': {
        type: 'MetaGraphFile',
        purpose: 'The root file that imports all graph parts to provide a holistic, machine-readable representation of the project.',
      },
      '_graph_parts/': {
        type: 'MetaDirectory',
        purpose: 'Contains the modular parts of the project graph.',
      },
      'scripts/graph_validator.mjs': {
        type: 'UtilityScript',
        purpose: 'A script to validate the integrity and accuracy of the project graph against the source code. (Future implementation)',
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