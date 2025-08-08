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
│   ├── sync_ai_commands.mjs      # AI command sync (planned)
│   ├── clean_project.mjs         # Clean from parent project data
│   ├── sync_to_standalone.mjs    # Sync to standalone directory
│   └── publish_workflow.mjs      # Complete publish workflow
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

## Development Workflow

### Dual Directory Setup

This ProjectGraphAgent is designed to work in two modes:

1. **Parent Project Mode** (`/home/igor/Документы/Проекты/tsx_viewer/ProjectGraphAgent/`)
   - Contains project-specific data (TSX-viewer entities, settings)
   - Used for active development and testing
   - Manages the parent project (TSX-viewer)

2. **Standalone Mode** (`/home/igor/Документы/Проекты/ProjectGraphAgent/`)
   - Clean, universal template
   - Ready for publication on GitHub
   - Used for distribution and reuse

### Synchronization Workflow

1. **Develop in Parent Project**:
   ```bash
   # Work in tsx_viewer/ProjectGraphAgent/
   # Make changes to scripts, graph_parts, adapters, etc.
   ```

2. **Sync to Standalone**:
   ```bash
   # From tsx_viewer/ProjectGraphAgent/
   npm run sync
   ```

3. **Clean Standalone for Publication**:
   ```bash
   cd /home/igor/Документы/Проекты/ProjectGraphAgent
   npm run clean
   ```

4. **Publish to GitHub**:
   ```bash
   cd /home/igor/Документы/Проекты/ProjectGraphAgent
   git add -A
   git commit -m "feat: new feature"
   git push origin main
   ```

### Automated Publish Workflow

For convenience, use the automated publish workflow:

```bash
# From tsx_viewer/ProjectGraphAgent/
npm run publish
```

This will:
1. Sync changes to standalone directory
2. Clean standalone from parent project data
3. Prepare Git commit
4. Show push instructions

To auto-push to GitHub:
```bash
npm run publish -- --push
```

### What Gets Synced

**Synced Files** (from parent to standalone):
- `scripts/` - All automation scripts
- `graph_parts/` - Templates, policies, schemas (excluding entities)
- `adapters/` - Language adapters
- `README.md`, `README_PUBLISH.md`, `CHANGELOG.md`, `LLM_GUIDELINES.md`
- `LICENSE`, `package.json`, `.gitignore`

**Excluded Files** (parent-specific):
- `project_graph.jsonnet` - Contains parent project data
- `graph_parts/entities.jsonnet` - Contains parent project entities
- `settings.json` - Parent project settings
- `.cache/`, `memory-bank/` - Generated artifacts

## Cleaning from Parent Project Data

When you copy ProjectGraphAgent from a parent project, you can clean it to remove parent-specific data:

```bash
# Clean from parent project data
npm run clean

# Or directly
node scripts/clean_project.mjs
```

This will:
- Reset `project_graph.jsonnet` to template values
- Clean `graph_parts/entities.jsonnet` to universal examples
- Remove `.cache/`, `memory-bank/`, `settings.json`
- Update `package.json` with ProjectGraphAgent metadata
- Create appropriate `.gitignore`

### Standalone Publication Workflow

1. **Copy to separate directory**:
   ```bash
   mkdir -p /home/igor/Документы/Проекты/ProjectGraphAgent
   cp -r ProjectGraphAgent/* /home/igor/Документы/Проекты/ProjectGraphAgent/
   ```

2. **Run cleanup**:
   ```bash
   cd /home/igor/Документы/Проекты/ProjectGraphAgent
   npm run clean
   ```

3. **Publish to GitHub**:
   ```bash
   git init
   git remote add origin https://github.com/LebedevIV/ProjectGraphAgent.git
   git add -A
   git commit -m "Initial commit: ProjectGraphAgent v0.1.0-alpha"
   git push -u origin main
   ```

See `CLEANUP_INSTRUCTIONS.md` for detailed instructions.

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

