# TSX View/Edit

![TSX View/Edit Screenshot](https://github.com/01esyaLebedeva/tsx_viewer/blob/7eb05d71a16647c4a9a5a6cd98b48c17cbf7274c/docs/images/screen_03_TSX_edit.png?raw=true)

**TSX View/Edit** is a minimalist, cross-platform desktop application for viewing and interactively previewing `.tsx` (TypeScript with JSX) files. It serves as a lightweight tool for developers who need to quickly visualize React components without running a full development project.

## 🚀 Features

*   **Live Preview:** Instantly see the rendered output of your TSX code.
*   **Code Editor:** Make changes to the code and see the results immediately.
*   **Dependency Support:** The application uses a CodeSandbox environment to automatically handle npm dependencies specified in your code.
*   **Resizable Panels:** Adjust the size of the editor and preview panels for a comfortable workflow.
*   **Cross-Platform:** Works on Linux and Windows.
*   **Internationalization:** Supports English and Russian languages.

## 🛠️ Tech Stack

*   **Runtime:** Electron
*   **UI Framework:** React
*   **Language:** TypeScript
*   **Bundler:** Vite
*   **Sandbox:** `@codesandbox/sandpack-react`

## 📦 Installation and Usage

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/01esyaLebedeva/tsx_viewer.git
    cd tsx_viewer
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run in development mode:**
    ```bash
    npm run dev
    ```

4.  **Build the application:**
    ```bash
    npm run build
    ```
    The bundled files will appear in the `dist-electron` directory.

## 💡 Speeding Up the Build (for Windows)

If you are working on Windows and do not intend to create packages for Linux (`snap`, `AppImage`, etc.), you can temporarily disable the Linux build to speed up the `npm run build` process.

To do this, find the `build` section in the `package.json` file and rename the `linux` key to `_linux`:

```json
"build": {
  ...
  "_linux": { // <-- Key renamed
    "desktop": "src/tsx_viewer.desktop",
    "category": "Utility;Development;Viewer;",
    "icon": "src/icons/tsx_viewer.png",
    "target": [
      "snap",
      "AppImage",
      "deb",
      "pacman"
    ]
  },
  ...
}
```

To re-enable the Linux build, simply rename the key back to `linux`.

## 💾 Downloads

*   [Download .AppImage](https://github.com/01esyaLebedeva/tsx_viewer/releases/download/v1.0.3/tsx-viewer-1.0.3.AppImage)
*   [Download .pacman](https://github.com/01esyaLebedeva/tsx_viewer/releases/download/v1.0.3/tsx-viewer-1.0.3.pacman)
*   [Download .deb](https://github.com/01esyaLebedeva/tsx_viewer/releases/download/v1.0.3/tsx-viewer_1.0.3_amd64.deb)
*   [Download .snap](https://github.com/01esyaLebedeva/tsx_viewer/releases/download/v1.0.3/tsx-viewer_1.0.3_amd64.snap)

## 🗺️ Roadmap

*   [ ] Implement file saving.
*   [ ] Improve error handling and display.
*   [ ] Add support for multiple file tabs.
*   [ ] Add a file tree sidebar for easy navigation.

## 🤖 AI Assistant Integration

This project is configured for effective collaboration with AI assistants like Gemini. To facilitate a deep understanding of the project's structure, it uses a `project_graph.jsonnet` file.

**What is it?**
`project_graph.jsonnet` is a structured description of the project, including:
*   Key files and components.
*   Their purpose and dependencies.
*   Interaction channels (e.g., IPC messages in Electron).

**Why is it needed?**
This file allows the AI assistant to quickly build a "mental map" of the project, leading to more accurate and context-aware coding, refactoring, and analysis.

**How to work with it?**
1.  **Keep it updated:** When adding new key components or changing interaction logic, please update `project_graph.jsonnet`.
2.  **Use Jsonnet:** You may need [Jsonnet](https://jsonnet.org/) to work with the file. You can install it via a package manager (e.g., `sudo apt-get install jsonnet`).

## 📄 License

This project is licensed under the [GPL-3.0 license](LICENSE).
