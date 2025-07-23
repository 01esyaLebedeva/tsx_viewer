# System Patterns

## Архитектура
- Electron main process запускает React/Vite-приложение.
- React-приложение использует Sandpack для предпросмотра и редактирования TSX.

## Ключевые технические решения
- Sandpack для live preview и npm dependencies.
- Drag-n-drop и file input для загрузки файлов.
- AST/RegExp-парсинг для замены иконок на emoji.

## Паттерны
- Provider pattern (SandpackProvider).
- State management через React useState/useRef.
- Разделение UI на стартовый экран и рабочую область.

## Связи компонентов
- App.tsx управляет загрузкой, предпросмотром и редактором.
- Electron main.js отвечает за запуск и загрузку UI. 