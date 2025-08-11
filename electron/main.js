const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const Store = require('electron-store')
const store = new Store()

const isDev = !app.isPackaged;

let filePathToOpen = null;

// For Windows and Linux, the file path is passed as a command line argument.
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    const win = BrowserWindow.getAllWindows()[0];
    if (win) {
      if (win.isMinimized()) win.restore();
      win.focus();
      const filePath = commandLine.pop();
      if (filePath && filePath !== '.') {
        win.webContents.send('file-opened-from-cli', filePath);
      }
    }
  });
}

// For macOS, the file path is passed through the 'open-file' event.
app.on('open-file', (event, path) => {
  event.preventDefault();
  filePathToOpen = path;
  const win = BrowserWindow.getAllWindows()[0];
  if (win) {
    win.webContents.send('file-opened-from-cli', path);
  }
});


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
    const theme = store.get('theme', 'light')
    win.webContents.send('set-theme', theme)

    // Handle file opening from command line argument
    const filePath = process.argv.find(arg => arg.endsWith('.tsx'));
    if (filePath) {
        win.webContents.send('file-opened-from-cli', filePath);
    } else if (filePathToOpen) {
        win.webContents.send('file-opened-from-cli', filePathToOpen);
        filePathToOpen = null;
    }
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

ipcMain.on('set-theme', (event, theme) => {
  store.set('theme', theme)
})

ipcMain.on('read-file-from-cli', (event, filePath) => {
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      console.error('Failed to read the file from cli', err);
      event.sender.send('file-open-error', err.message);
    } else {
      event.sender.send('file-content-from-cli', {
        path: filePath,
        name: path.basename(filePath),
        content: data
      });
    }
  });
});