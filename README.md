# TSX Electron Viewer

A minimal desktop viewer for TSX files, built with Electron, React, TypeScript, and Vite.

## Features
- Drag-and-drop or select a TSX file
- Compile and preview TSX files with npm dependencies support
- Minimal and intuitive interface

## Quick Start

1. Clone the repository and navigate to the project folder:
   ```bash
   git clone https://github.com/01esyaLebedeva/tsx_viewer 
   tsx-electron-viewer
   cd tsx-electron-viewer
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the application:
   ```bash
   npm run dev
   ```

## Project Structure
- `electron/main.ts` — Electron main process
- `src/` — React application (TypeScript, Vite)
- `public/` — Static files

## Notes
- To use any npm dependencies (e.g., lucide-react), just add them via `npm install <package>` and use them in your TSX files.
- The interface can be extended as needed.

---

If you have any questions, feel free to ask!
