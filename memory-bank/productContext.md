# Project Context for TSX Viewer/Editor

## Project Overview
This project is a TSX viewer and editor application, supporting both web and Electron environments.

## Key Features

### 1. File Opening
- **Electron:** Uses `ipcRenderer.send('open-file-dialog')` to trigger a native file dialog.
- **Web (Modern Browsers):** Uses the File System Access API (`window.showOpenFilePicker`) for a more integrated experience.
- **Web (Fallback):** Uses a standard HTML `<input type="file">` element for older browsers.
- **Drag and Drop:** Files can be opened by dragging and dropping them onto the application window.

### 2. File Saving
- **Electron:** Uses `ipcRenderer.send('save-file')` to save content to the original file path.
- **Web (Modern Browsers):** Uses the File System Access API (`fileHandle.createWritable()`) to save changes directly to the file.
- **Web (Fallback):** Downloads the edited content as a new file using a `Blob` and `URL.createObjectURL`.

### 3. Code Editing and Preview
- **Editor:** Uses `@codesandbox/sandpack-react` to provide a code editor with live preview.
- **State Management:** The `isDirty` state is used to track whether the file has been modified since it was last saved.

## Key Files Involved:
- `src/App.tsx`: Contains the core React component logic, state management, and UI.
- `electron/main.js`: Handles IPC communications for file operations in the Electron environment.
- `vite.config.ts`: Vite build configuration.
- `tsconfig.json`: TypeScript compiler options.
