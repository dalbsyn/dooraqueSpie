const { app, BrowserWindow, desktopCapturer, session, ipcMain } = require('electron');
const path = require('node:path')
let mainWindow;
let popupWindow;
function createWindow(){
  mainWindow = new BrowserWindow({
    width: 800,
    height: 800,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
    }
  });
  mainWindow.loadFile('index.html'); 
}


function createPopupWindow() {
  popupWindow = new BrowserWindow({
      width: 400,
      height: 300,
      parent: mainWindow, // Указываем родительское окно
      modal: true, // Окно будет модальным
      show: false, // Не показываем сразу
      webPreferences: {
          nodeIntegration: true,
          contextIsolation: false
      }
  });

  popupWindow.loadFile('admin/settings.html'); // Загружаем файл для всплывающего окна

  popupWindow.once('ready-to-show', () => {
      popupWindow.show(); // Показываем окно, когда оно готово
  });

  // Очистка объекта при закрытии
  popupWindow.on('closed', () => {
      popupWindow = null;
  });
}
app.whenReady().then(() => {
  createWindow()

  session.defaultSession.setDisplayMediaRequestHandler((request, callback) => {
    desktopCapturer.getSources({ types: ['screen'] }).then((sources) => {
      // Grant access to the first screen found.
      callback({ video: sources[0], audio: 'loopback' });
    });
  }, { useSystemPicker: true });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })

  ipcMain.on('open-popup', () => {
    createPopupWindow();
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})