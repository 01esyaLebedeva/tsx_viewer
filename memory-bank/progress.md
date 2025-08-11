# Project Progress

## Session 1
- Fixed multiple TypeScript errors in `src/App.tsx`.
- Fixed a cyclic dependency issue that was causing the editor to re-render infinitely.
- Refactored the editor to use the `useActiveCode` hook for state management.
- Pushed all changes to the remote repository.

## Session 2
- Implemented drag and drop for opening files.
- Added support for the File System Access API for opening and saving files in the web version.
- Improved the `isDirty` state management to more accurately track changes.
- Updated the UI to provide better feedback to the user (e.g., loading spinners, error messages).

## Session 3
- Modularized the project graph system into a dedicated `project_graph` directory.
- Resolved `jsonnet` compilation issues related to import paths and missing files.
- Updated `package.json` and relevant scripts to reflect the new module structure.
- Committed and pushed all changes to the remote repository.