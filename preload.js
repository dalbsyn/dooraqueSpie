const { contextBridge, ipcRenderer } = require('electron');

// Экспонируем методы для рендер-процесса
contextBridge.exposeInMainWorld('electron', {
  captureScreen: () => ipcRenderer.invoke('capture-screen')
});
