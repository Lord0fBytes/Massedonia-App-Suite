const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  loadURL: (url) => ipcRenderer.send('load-url', url),
});
