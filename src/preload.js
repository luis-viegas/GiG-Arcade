const { ipcRenderer, contextBridge } = require("electron");
const path = require('path');
const process = require('process');

const ERROR_ON_ICON = "error_on_icon";


contextBridge.exposeInMainWorld(
  'gigaArcade',
  {
    startGame: (game) => ipcRenderer.send('start-game', game),
    games : ipcRenderer.invoke('get-games'), 
    gamesSync: () => ipcRenderer.sendSync('get-games-sync'),
    getGameMediaPath: (game_name ,media) => 
    {
      //Verifies if the game has an error on any media requirement
      switch (media) {
        case ERROR_ON_ICON:
          return path.win32.join('..' , 'placeholder-games.png' )
      
        default:
          return path.win32.join('..' ,'decompressed_games', game_name, "media", media )
      } 
      
    },

  }
)

