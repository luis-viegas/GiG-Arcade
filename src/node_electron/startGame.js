const path = require('path')
const child_process = require('child_process')
const fs = require('fs')

/**
 * Dirname where the games are relative to the electron.js file
 */
 const games_diretory = "decompressed_games"


module.exports.startGame = (game, current_dir)=>{
    const games_path = path.join(current_dir, '..','renderer', games_diretory)
    console.log(path.win32.join(games_path, game, (game + ".exe")))

    if(fs.existsSync(path.win32.join(games_path, game, (game + ".exe")))){

        let current_game = child_process.execFile(path.win32.join(games_path,game, (game + ".exe")), (error, stdout, stderr) => {
            if (error) {
                throw error;
            }
            //TODO Close popup
            current_game = undefined;
        });

    }

    //
   //TODO Start popup

}