const { app, BrowserWindow } = require('electron');
const path = require('path');

const isDev = !app.isPackaged;

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: true,
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

  // Detect user's system locale
  const locale = app.getLocale();

  // Send the locale to the renderer process when the window is ready
  win.webContents.on('did-finish-load', () => {
    win.webContents.send('locale-update', locale);
  });
    // Detect user's system locale
    const locale = app.getLocale();
  
    // Send the locale to the renderer process when the window is ready
    win.webContents.on('did-finish-load', () => {
      win.webContents.send('locale-update', locale);
    });
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
}); 