const { desktopCapturer, ipcRenderer } = require('electron');

// Экспорт API для рендера
window.electronAPI = {
    getScreenSources: () => desktopCapturer.getSources({ types: ['screen'] }),
};
