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

  const locale = app.getLocale();

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

ipcMain.on('open-file-dialog', (event) => {
  const win = BrowserWindow.getFocusedWindow();
  if (!win) return;

  dialog.showOpenDialog(win, {
    properties: ['openFile'],
    filters: [{ name: 'TSX Files', extensions: ['tsx'] }]
  }).then(result => {
    if (!result.canceled && result.filePaths.length > 0) {
      const filePath = result.filePaths[0];
      fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
          console.error('Failed to read the file', err);
          event.sender.send('file-open-error', err.message);
        } else {
          event.sender.send('file-opened', {
            path: filePath,
            name: path.basename(filePath),
            content: data
          });
        }
      });
    }
  }).catch(err => {
    console.error(err);
  });
});

ipcMain.on('save-file', (event, { filePath, code }) => {
  if (!filePath) {
    console.error('File path is not available for saving.');
    return;
  }

  fs.writeFile(filePath, code, (err) => {
    if (err) {
      console.error('Failed to save the file', err);
    } else {
      console.log('File saved successfully');
      event.sender.send('file-saved-successfully');
    }
  });
});