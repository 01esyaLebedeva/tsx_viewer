# Technical Context for TSX Viewer/Editor

## Core Technologies
- **React:** The core UI library.
- **TypeScript:** For static typing.
- **Electron:** For the desktop application wrapper.
- **Vite:** For the build tooling and development server.
- **Sandpack:** For the code editor and preview functionality.
- **Tailwind CSS:** For styling.
- **i18next:** For internationalization.
- **Jsonnet:** A data templating language used for defining the project graph.

## Key Architectural Patterns
- **Component-Based Architecture:** The application is built around React components.
- **State Management:** State is managed within the `App` component using React hooks (`useState`, `useEffect`, `useMemo`, `useCallback`).
- **IPC Communication:** In the Electron environment, `ipcRenderer` and `ipcMain` are used for communication between the renderer and main processes for file operations.
- **Conditional Logic for Web vs. Electron:** The application uses `window.Electron` to conditionally render different UI elements and logic for the web and desktop versions.
- **Modular Project Graph:** The project's architecture is now formally defined using Jsonnet in a dedicated `project_graph` module, allowing for auditing and future visualization.

## Key Functions and Components
- **`App`:** The main application component.
- **`Editor`:** A component that wraps `SandpackCodeEditor` and uses the `useActiveCode` hook to manage code updates.
- **`handleFile`:** Handles file loading and reading.
- **`triggerFileDialog`:** Opens the file dialog.
- **`handleSave`:** Saves the edited code.
- **`handleCodeChange`:** Updates the `editedCode` state.
- **`sandpackFiles`:** A memoized object that provides the files to the `SandpackProvider`.
- **`project_graph/scripts/graph_auditor.mjs`:** Script to audit the project structure against the defined project graph.

## Build and Development
- **`npm run dev`:** Starts the Vite development server.
- **`npm run build`:** Builds the application for production.
- **`npm run electron:start`:** Starts the Electron application.
- **`npm run graph:audit`:** Runs the project graph audit to check for discrepancies.