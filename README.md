# TSX Electron Viewer

Минимальный десктопный вьювер для TSX-файлов на базе Electron + React + TypeScript + Vite.

## Возможности
- Drag-n-drop или выбор TSX-файла
- Компиляция и предпросмотр TSX-файлов с поддержкой npm-зависимостей
- Минимальный интерфейс

## Быстрый старт

1. Клонируйте репозиторий и перейдите в папку проекта:
   ```bash
   git clone <your-repo-url> tsx-electron-viewer
   cd tsx-electron-viewer
   ```
2. Установите зависимости:
   ```bash
   npm install
   ```
3. Запустите приложение:
   ```bash
   npm run dev
   ```

## Структура проекта
- `electron/main.ts` — основной процесс Electron
- `src/` — React-приложение (TypeScript, Vite)
- `public/` — статические файлы

## Примечания
- Для поддержки любых npm-зависимостей (например, lucide-react) просто добавьте их через `npm install <package>` и используйте в TSX-файлах.
- Интерфейс можно расширять по мере необходимости.

---

Если возникнут вопросы — пишите! 