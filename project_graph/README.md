# Project Graph

This directory contains a system for modeling the software architecture of the `tsx_viewer` project.

## Purpose

The goal of this system is to:

*   **Document:** Provide a single source of truth for the project's components, their purposes, and their interactions.
*   **Audit:** Automatically check for discrepancies between the documented graph and the actual file structure of the project.
*   **Visualize:** (Future) Generate diagrams and other visualizations of the project architecture from the graph data.

## Structure

*   `project_graph.jsonnet`
    *   The root file that assembles the entire graph.
*   `_graph_parts/`
    *   `entities.jsonnet`: Defines all the core components, files, and resources of the project.
    *   `relations.jsonnet`: Defines the relationships *between* the entities (e.g., which component uses which, IPC channels).
    *   `templates.jsonnet`: Reusable schemas for different types of entities.
    *   `policies.jsonnet`: Defines architectural rules and conventions for the project.
*   `scripts/`
    *   `graph_auditor.mjs`: The script that compares the graph to the live project files and reports any drift.
    *   `graph_validator.mjs`: (Future) A script to validate the graph against the policies defined in `policies.jsonnet`.

## Usage

To run the audit, use the following npm script:

```bash
npm run graph:audit
```
