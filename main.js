const { app, BrowserWindow } = require('electron');
const path = require('path');
const { autoUpdater } = require('electron-updater');

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1280,
        height: 1024,
        webPreferences : {
            preload: path.join(__dirname, './preload.js'),
            contextIsolation:true,
            sandbox: false,
        }
    });

    win.loadFile('index.html');
}

//App Start
app.whenReady().then(() => {
    createWindow();
    autoUpdater.checkForUpdatesAndNotify();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
          createWindow();
        }
    });
});

autoUpdater.on("update-available", () => {
    alert("update-available");
});

autoUpdater.on("checking-for-update", () => {
    alert("checking-for-update");
});

autoUpdater.on("download-progress", () => {
    alert("download-progress");
});

autoUpdater.on("update-downloaded", () => {
    alert("update-downloaded");
});


//App Stop
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

// const helmet = require("helmet");

// app.use(helmet());