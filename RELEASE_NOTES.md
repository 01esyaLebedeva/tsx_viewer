# Release Notes

## v1.0.6 - Feature Update

### ✨ Features

*   **File Opening:** Implemented multiple ways to open files:
    *   Native file dialog in Electron.
    *   File System Access API in modern web browsers.
    *   Standard file input as a fallback.
    *   Drag and drop functionality.
*   **File Saving:** Implemented file saving capabilities:
    *   Directly to the file path in Electron.
    *   Using the File System Access API in modern web browsers.
    *   As a download in older web browsers.
*   **State Management:** Improved `isDirty` state management to accurately track file modifications.
*   **UI Enhancements:** Added loading spinners and error messages for better user feedback.

### 🛠️ Fixes

*   Resolved multiple TypeScript errors.
*   Fixed a cyclic dependency issue that caused infinite re-renders in the editor.
*   Refactored the editor component for better state management.

## v1.0.3 - Initial Release

### ✨ Features

*   **Live Preview:** Implemented a core feature to view `.tsx` files with a live-rendering preview using `@codesandbox/sandpack-react`.
*   **Code Editor:** Added a code editor panel alongside the preview.
*   **Resizable Layout:** The UI now includes resizable panels for a flexible workspace.
*   **Cross-Platform Support:** The application is configured to build for Linux and Windows using Electron.
*   **Internationalization:** Basic i18n setup with support for English and Russian.

### 📦 Assets

*   `tsx-viewer_1.0.3_amd64.deb`
*   `tsx-viewer_1.0.3_amd64.snap`
*   `tsx-viewer-1.0.3.AppImage`
*   `tsx-viewer-1.0.3.pacman`

### 🛠️ Known Issues

*   File saving is not yet implemented. Changes made in the editor cannot be saved.
*   No advanced error handling for code compilation or runtime issues.
