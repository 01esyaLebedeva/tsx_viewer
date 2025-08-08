# ProjectGraphAgent

ProjectGraphAgent is a Jsonnet-driven project control system designed for AI agents (Cursor, Gemini, Claude, Roo, Kilocode). It provides a comprehensive framework for documenting project architecture, tracking drift between declared and observed states, generating visual diagrams, automating grouped commits, and producing agent-friendly artifacts.

## Key Features

- **Declared vs Observed Graph**: Jsonnet "declared" model + language adapters "observed" model → automatic drift detection
- **Agent-Friendly Outputs**: Compiled graph JSON, drift reports, Mermaid diagrams, plans markdown, snapshots and events
- **Automation**: Grouped commits, AI command synchronization, CI workflow integration
- **Multi-Language Support**: TypeScript/JavaScript and Python adapters (extensible)

## Structure

```
ProjectGraphAgent/
├── project_graph.jsonnet          # Root configuration
├── graph_parts/                   # Modular graph components
│   ├── entities.jsonnet          # Project entities
│   ├── relations.jsonnet         # Entity relationships
│   ├── policies.jsonnet          # Development policies
│   ├── ai_commands.jsonnet       # AI command mappings
│   ├── templates.jsonnet         # Reusable templates
│   ├── plans.jsonnet             # Project plans/roadmaps
│   └── schema.jsonnet            # Validation schema
├── scripts/                       # Node.js automation scripts
│   ├── graph_generator.mjs       # Main generator (audit, drift, diagrams)
│   ├── graph_validator.mjs       # Schema validation
│   ├── ai_committer.mjs          # Grouped commits (planned)
│   └── sync_ai_commands.mjs      # AI command sync (planned)
├── adapters/                      # Language-specific adapters
│   ├── typescript.mjs            # TS/JS file analysis
│   └── python.mjs                # Python file analysis
├── .cache/                        # Generated artifacts (git-ignored)
│   ├── graph.json                # Compiled graph (observed + drift)
│   ├── history/                   # Timestamped snapshots
│   └── events.ndjson             # Event log
└── README.md                      # This file
```

## Usage

### Quick Start

1. **Copy the system** into your project:
   ```bash
   cp -r ProjectGraphAgent/ your-project/
   ```

2. **Customize configuration** in `ProjectGraphAgent/project_graph.jsonnet`:
   ```jsonnet
   {
       projectName: 'your-project-name',
       projectUrl: 'https://github.com/your-username/your-project',
       description: 'Your project description here.',
       // ... rest of configuration
   }
   ```

3. **Install dependencies**:
   ```bash
   # Install Jsonnet
   # Linux: apt install jsonnet
   # macOS: brew install jsonnet
   # Windows: winget install jsonnet
   ```

4. **Run the generator**:
   ```bash
   node ProjectGraphAgent/scripts/graph_generator.mjs --keep-compiled
   ```

### Generated Artifacts

- `ProjectGraphAgent/.cache/graph.json` - Compiled graph with observed data and drift
- `memory-bank/diagrams/graph.mmd` - Mermaid diagram of relations
- `memory-bank/drift.md` - Drift report (declared vs observed)
- `memory-bank/plans/` - Domain-specific plan markdown files

### CI Integration

Add to `.github/workflows/*.yml`:
```yaml
- name: Generate Graph
  run: node ProjectGraphAgent/scripts/graph_generator.mjs --keep-compiled
- name: Validate Graph
  run: node ProjectGraphAgent/scripts/graph_validator.mjs
```

## AI Assistant Command Mapping

The system maps conversational commands to npm scripts:

| Platform | Command | Action |
|----------|---------|--------|
| Gemini | `graph-audit` | `node ProjectGraphAgent/scripts/graph_generator.mjs` |
| Cursor | `graph-audit` | `node ProjectGraphAgent/scripts/graph_generator.mjs` |
| Kilocode | `graph-audit` | `node ProjectGraphAgent/scripts/graph_generator.mjs` |
| Roo | `graph-audit` | `node ProjectGraphAgent/scripts/graph_generator.mjs` |

## Drift

The system automatically computes drift between declared (Jsonnet) and observed (adapters) entities:

- **missingDeclared**: Files in codebase not declared in graph
- **missingObserved**: Declared entities not found in codebase

Results are written to:
- Compiled graph (`ProjectGraphAgent/.cache/graph.json`)
- Drift report (`memory-bank/drift.md`)
- README summary

## Alpha Status

⚠️ **Early Alpha**: This system is in active development.

**Current Limitations:**
- Adapters use basic heuristics (simple import scanning)
- Drift detection is entity-level only
- Policy engine is basic (shape/schema validation)
- Advanced rule DSL coming in future versions

## License

Inherits the repository license (GPL-3.0-or-later by default).

## Contributing

See `CONTRIBUTING.md` for development guidelines and contribution process.

