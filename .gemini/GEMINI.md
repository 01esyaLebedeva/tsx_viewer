# Rules

- Use context7 tool when you use a new library, create a new integration
- Use Sequential thinking for complex reflections.
- Use context7 to access documentation of all libraries
- To implement any features using integrations with external api/libraries, study the documentation using context7 tools
- Before applying any file changes using the `apply_diff` tool, always first retrieve the current file content using the `read_file` tool. This ensures that changes are applied to the most up-to-date version of the file, preventing errors related to stale file states.
- Before applying any file changes using the `write_file` or `replace` tools, always first retrieve the current file content using the `read_file` tool. This ensures that changes are applied to the most up-to-date version of the file, preventing errors related to stale file states.
- At the beginning of each session, read and parse `project_graph.jsonnet` to build a mental model of the project's architecture and dependencies.
