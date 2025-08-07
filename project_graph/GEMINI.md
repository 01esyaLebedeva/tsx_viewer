# Guidelines for AI Agents on `project_graph`

Hello, AI Agent!

This `project_graph/` directory is designed to be a structured, machine-readable representation of the `tsx_viewer` project's architecture and operational guidelines. Its primary purpose is to facilitate your understanding and interaction with this codebase.

## Key Information for AI Agents:

1.  **Single Source of Truth:** The `project_graph.jsonnet` file (and its imported parts in `_graph_parts/`) is the definitive source of truth for project structure, components, relationships, and AI-specific configurations.

2.  **Machine-Readable Format:** The `.jsonnet` files compile into JSON, which is easily parsable. You should prioritize reading and interpreting the *compiled JSON output* of `project_graph.jsonnet` for a comprehensive understanding.

3.  **AI Command Mappings:** The `aiCommands` section within the compiled `project_graph.jsonnet` (defined in `_graph_parts/ai_commands.jsonnet`) contains explicit mappings for conversational trigger phrases to `npm` commands. This is crucial for understanding and executing project-specific actions like `npm run graph:audit` or `npm run graph:commit`.

4.  **Automated Documentation:** The `project_graph/README.md` file is *generated* from the `project_graph.jsonnet` data by `project_graph/scripts/graph_generator.mjs`. While useful for human readability, for programmatic understanding, always refer to the raw `.jsonnet` data.

5.  **Scripts for Interaction:**
    *   `project_graph/scripts/graph_generator.mjs`: Use this script (via `npm run graph:audit`) to re-generate `project_graph/README.md` and perform a project audit.
    *   `scripts/ai_committer.mjs`: Use this script (via `npm run graph:commit`) to automate Git commits based on defined rules.
    *   `scripts/sync_ai_commands.mjs`: Use this script (via `npm run sync:ai-commands`) to update your own configuration files (like this one, or those for Cursor, Roo, Kilocode) with the latest command mappings.

## How to Use This Information:

*   **Prioritize `project_graph.jsonnet`:** When analyzing the project, start by compiling and reading `project_graph.jsonnet`.
*   **Execute Commands:** When a user requests an action that matches a `triggerPhrase` in `aiCommands`, execute the corresponding `npmCommand`.
*   **Maintain Consistency:** If you are capable, you can use `npm run sync:ai-commands` to keep your internal command mappings up-to-date with the project's definitions.

By adhering to these guidelines, you can achieve a deeper and more accurate understanding of the `tsx_viewer` project and provide more effective assistance.
