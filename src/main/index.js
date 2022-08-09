import { 
  app, 
  BrowserWindow, 
  ipcMain,
  Menu,
} from 'electron'
import '../renderer/store'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  Menu.setApplicationMenu(null)
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    transparent: true,
    backgroundColor: '#00000000',
    frame: false,
    useContentSize: true,
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

ipcMain.on('getPrinterList', (event) => {
  const list = mainWindow.webContents.getPrinters()
  mainWindow.webContents.send('getPrinterList', list)
})
//登录窗口最小化
ipcMain.on('min',function(){
  mainWindow.minimize();
})
//登录窗口最大化
ipcMain.on('max',function(){
  if(mainWindow.isMaximized()){
      // mainWindow.restore(); 
      mainWindow.unmaximize();
  }else{
      mainWindow.maximize(); 
  }
})
ipcMain.on('close',function(){
  mainWindow.close();
})


/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
