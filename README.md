# TSX Viewer

![TSX Viewer Screenshot](https://github.com/OlesyaCore/tsx_viewer/assets/103334168/85013931-31e6-4360-a031-1927c175c58c)

**TSX Viewer** is a minimalist, cross-platform desktop application for viewing and interactively previewing `.tsx` (TypeScript with JSX) files. It serves as a lightweight tool for developers who need to quickly visualize React components without running a full development project.

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
    git clone https://github.com/OlesyaCore/tsx_viewer.git
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

## 🗺️ Roadmap

*   [ ] Implement file saving.
*   [ ] Improve error handling and display.
*   [ ] Add support for multiple file tabs.
*   [ ] Add a file tree sidebar for easy navigation.

## 📄 License

This project is licensed under the [GPL-3.0 license](LICENSE).
