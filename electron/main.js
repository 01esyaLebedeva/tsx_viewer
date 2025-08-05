const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

const isDev = !app.isPackaged;

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // Detect user's system locale
  const locale = app.getLocale();

  // Send the locale to the renderer process when the window is ready
  win.webContents.on('did-finish-load', () => {
    win.webContents.send('locale-update', locale);
  });

  if (isDev) {
    win.loadURL('https://localhost:8081/');
  } else {
    win.loadFile(path.join(__dirname, '../dist/index.html'));
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

ipcMain.on('save-file', (event, { fileName, code }) => {
  const win = BrowserWindow.getFocusedWindow();
  if (!win) return;

  dialog.showSaveDialog(win, {
    defaultPath: fileName,
    filters: [{ name: 'TSX Files', extensions: ['tsx'] }],
  }).then(result => {
    if (!result.canceled && result.filePath) {
      fs.writeFile(result.filePath, code, (err) => {
        if (err) {
          console.error('Failed to save the file', err);
        } else {
          console.log('File saved successfully');
        }
      });
    }
  });
});