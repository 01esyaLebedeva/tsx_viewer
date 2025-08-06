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

## 📄 License

This project is licensed under the [GPL-3.0 license](LICENSE).
