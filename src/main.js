const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const startGame = require('./node_electron/startGame')
const io = require('./node_electron/io')


let games;
let mainWindow;
let loadingWindow;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1920,
    height: 1000,
    fullscreen: true,
    minimizable: false,
    frame:false,
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    }
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

};

const createLoadingPopup = () => {
  loadingWindow = new BrowserWindow({
    width: 300,
    height: 300,
    center: true,
    resizable: false,
    movable: false,
    fullscreenable: false,
    fullscreen: false,
    minimizable: false,
    maximizable: false,
    frame:false,
  });

  loadingWindow.loadFile(path.join('.webpack', 'renderer','pop_up', 'pop_up.html' ));
}
  


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', ()=>{
  createLoadingPopup();
  io.get_games(__dirname).then((games_list)=>{
    games = games_list;
    games.sort((a,b)=>{
      if(a.year < b.year){
        return 1;
      }
      if(a.year > b.year){
        return -1;
      }
      if(a.name < b.name){
        return -1;
      }
      if(a.name > b.name){
        return 1;
      }
      return 0;
    }
    );
    console.log("Creating Main Window"); 
    createWindow();

    loadingWindow.close();
    ipcMain.handle('get-games', (e)=>{
      return games_list;
    })
  })


});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});


ipcMain.on('start-game', (event, data)=>{
  startGame.startGame(data, __dirname);
});


ipcMain.on('get-games-sync', (event, data)=>{
  event.returnValue= games;
});


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
