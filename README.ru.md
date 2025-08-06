# TSX View/Edit

![TSX Viewer Screenshot](https://github.com/01esyaLebedeva/tsx_viewer/blob/7eb05d71a16647c4a9a5a6cd98b48c17cbf7274c/docs/images/screen_03_TSX_edit.png?raw=true)

**TSX View/Edit** — это минималистичное кроссплатформенное десктопное приложение для просмотра и интерактивного предпросмотра файлов `.tsx` (TypeScript с JSX). Оно служит легковесным инструментом для разработчиков, которым нужно быстро визуализировать React-компоненты без необходимости запускать полный проект.

## 🚀 Основные возможности

*   **Живой предпросмотр:** Мгновенно просматривайте результат рендеринга вашего TSX-кода.
*   **Редактор кода:** Вносите изменения в код и сразу видите результат.
*   **Поддержка зависимостей:** Приложение использует "песочницу" CodeSandbox для автоматической загрузки npm-зависимостей, указанных в вашем коде.
*   **Изменяемые панели:** Настраивайте размер панелей редактора и предпросмотра для удобной работы.
*   **Кроссплатформенность:** Работает на Linux и Windows.
*   **Интернационализация:** Поддержка русского и английского языков.

## 🛠️ Технологический стек

*   **Среда выполнения:** Electron
*   **Фреймворк UI:** React
*   **Язык:** TypeScript
*   **Сборщик:** Vite
*   **"Песочница":** `@codesandbox/sandpack-react`

## 📦 Установка и запуск

1.  **Клонируйте репозиторий:**
    ```bash
    git clone https://github.com/01esyaLebedeva/tsx_viewer.git
    cd tsx_viewer
    ```

2.  **Установите зависимости:**
    ```bash
    npm install
    ```

3.  **Запустите в режиме разработки:**
    ```bash
    npm run dev
    ```

4.  **Соберите приложение:**
    ```bash
    npm run build
    ```
    Собранные файлы появятся в директории `dist-electron`.

## 💾 Загрузки

*   [Скачать .AppImage](https://github.com/01esyaLebedeva/tsx_viewer/releases/download/v1.0.3/tsx-viewer-1.0.3.AppImage)
*   [Скачать .pacman](https://github.com/01esyaLebedeva/tsx_viewer/releases/download/v1.0.3/tsx-viewer-1.0.3.pacman)
*   [Скачать .deb](https://github.com/01esyaLebedeva/tsx_viewer/releases/download/v1.0.3/tsx-viewer_1.0.3_amd64.deb)
*   [Скачать .snap](https://github.com/01esyaLebedeva/tsx_viewer/releases/download/v1.0.3/tsx-viewer_1.0.3_amd64.snap)

## 🗺️ Планы по развитию (Roadmap)

*   [ ] Реализация сохранения изменений в файле.
*   [ ] Улучшенная обработка и отображение ошибок.
*   [ ] Поддержка нескольких вкладок для файлов.
*   [ ] Добавление боковой панели с деревом файлов.

## 📄 Лицензия

Этот проект распространяется под лицензией [GPL-3.0 license](LICENSE).
