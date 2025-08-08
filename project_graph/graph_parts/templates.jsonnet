// _graph_parts/templates.jsonnet
// This part defines reusable templates for creating entities.

{
    Metadata(confidence, author, notes=''):: {
        confidence: confidence,
        author: author,
        timestamp: std.extVar('timestamp'),
        notes: notes,
    },

    Component(name, path, purpose, props=[], state=[], dependencies=[], interactions=[], metadata):: {
        type: 'ReactComponent',
        name: name,
        path: path,
        purpose: purpose,
        props: props,
        state: state,
        dependencies: dependencies,
        interactions: interactions,
        metadata: metadata,
    },

    IpcChannel(direction, purpose, payload={}, metadata):: {
        type: 'IPCChannel',
        direction: direction,
        purpose: purpose,
        payload: payload,
        metadata: metadata,
    },

    ProjectSettings(auditAfterCommit=false, updateMemoryBankOnAudit=false):: {
        settingsFileMetadata: {
            fileName: 'settings.json',
            filePath: 'project_graph/settings.json', // Relative to project root
            description: 'Configuration file for project-specific settings, including AI agent behaviors.',
        },
        options: {
            audit_after_commit: {
                value: auditAfterCommit,
                description: 'Automatically run a focused audit on committed files after each `graph:commit` operation.',
            },
            update_memory_bank_on_audit: {
                value: updateMemoryBankOnAudit,
                description: 'Log audit results to the memory-bank/audit_logs.md file.',
            },
        },
    },
}