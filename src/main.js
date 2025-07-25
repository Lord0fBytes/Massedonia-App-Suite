const { app, BrowserWindow, WebContentsView, ipcMain } = require('electron');
const path = require('path');

let mainWindow, view;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  //mainWindow.loadFile(path.join(__dirname, 'index.html'));
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  view = new WebContentsView();
  mainWindow.contentView.addChildView(view);

  const sidebarWidth = 100;
  const resizeView = () => {
    const [w, h] = mainWindow.getSize();
    view.setBounds({ x: sidebarWidth, y: 0, width: w - sidebarWidth, height: h });
  };

  resizeView();
  mainWindow.on('resize', resizeView);

  //view.setAutoResize({ width: true, height: true });
  view.webContents.loadURL('https://immich.masd.cloud');
  view.webContents.on('did-fail-load', () => {
    const errorPath = path.join(__dirname, 'error.html');
    view.webContents.loadFile(errorPath);
  });
}

ipcMain.on('load-url', (event, url) => {
  if (view && url) {
    view.webContents.loadURL(url);
  }
});

app.whenReady().then(createWindow);
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
