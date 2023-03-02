const fs = require('fs')
const path = require('path')
const child_process = require('child_process')


//TODO: Change directories in accord to what is been working

/**
 * Dirname where the games are relative to the electron.js file
 */
const games_diretory = "decompressed_games"


/**
 * File with recently added games
 */
const recently_added_games_file = "recently_added_games.txt"


/**
 * Name of the file where the game's info is collected
 */
const game_info = "info.json"

/**
 * Name of the file which stores local database
 */
const games_db = "db.json"

/**
 * Name of the directory whic contains the game's media
 */
const games_media = "media"

/**
 * PowerShell script name
 */
const powershell_script = "pullDatabaseFromRep.ps1"

/**
 * Game requirements list
 */
const GAME_REQUIREMENTS = [
    'name',
    'year',
    'description',
    'authors',
    'genres',
    'operatve_system',
    'UC',
    'website',
    'icon',
    'media'
]

/**
 * Author requirements list
 */
const AUTHOR_REQUIREMENTS = [
    'name',
    'role'
]

const AUTHOR_DEFAULT_NAME = "Unknown";
const AUTHOR_DEFAULT_ROLE = "Unknown";

const GENRE_OPTIONS = [
    "Action",
    "Adventure",
    "Action-Adventure",
    "Platform",
    "Puzzle",
    "Role-Playing",
    "Simulation",
    "Strategy",
    "Sports",
    "Sandbox",
    "Singleplayer",
    "Coop",
    "Others",
]

const GENRE_DEFAULT = "Others";

const OS_OPTIONS = [
    "Windows",
    "IOS",
    "MacOS",
    "Android",
    "Linux",
    "Other"
]

const OS_DEFAULT = "Other"

const UC_OPTIONS = [
    "CGRA",
    "LCOM",
    "DJCO",
    "JDMM",
    "DDJD",
    "LAIG",
    "SGI",
    "Others",
]

const UC_DEFAULT = "Others";

const ERROR_ON_ICON = "error_on_icon";

const MINIMUM_YEAR = 1990;

let games_list = []
let games_path;

function log(text){
    console.log("<IO_LOG> " + text )
}

/*
  ___             _ _ _                   ___  ___     _   _               _           
 / _ \           (_) (_)                  |  \/  |    | | | |             | |          
/ /_\ \_   ___  ___| |_  __ _ _ __ _   _  | .  . | ___| |_| |__   ___   __| |___  
|  _  | | | \ \/ / | | |/ _` | '__| | | | | |\/| |/ _ \ __| '_ \ / _ \ / _` / __|
| | | | |_| |>  <| | | | (_| | |  | |_| | | |  | |  __/ |_| | | | (_) | (_| \__ \
\_| |_/\__,_/_/\_\_|_|_|\__,_|_|   \__, | \_|  |_/\___|\__|_| |_|\___/ \__,_|___/
                                    __/ |                                              
                                   |___/
*/

function verifyGameIntegrity(file_path){
    let info = path.win32.join(file_path, game_info)
    //Verifies if the info file exists
    if(fs.existsSync(info)){
        let data = fs.readFileSync(info, 'utf8')
        let game = JSON.parse(data);
        if( game.name!=undefined && game.year!=undefined){
            games_list.push(game)
            return true;
        }
        return false;
            
    }
    else return false;
}


function save_games(games_list){
    log("Saving new games (if exist)")
    const db_path = path.join(__dirname, games_db)
    if(games_list.length === 0){return}


    const current_games = getLocalGames();
    const all_games = [... current_games, ... games_list]
    
    fs.writeFileSync(db_path, JSON.stringify(all_games))
        
}

function getLocalGames(){
    const db_path = path.join(__dirname, games_db)
    if(fs.existsSync(db_path)){

        let db = fs.readFileSync(db_path, 'utf8') 
        let database = JSON.parse(db)
        return database;
    }   
    else return [];

}


function updateLocalDatabase (current_dir){
    log("Updating Local database")

    let spawn = child_process.spawn("powershell.exe",[path.win32.join(current_dir, "pullDatabaseFromRep.ps1"), current_dir]);
    log(path.win32.join(current_dir, "pullDatabaseFromRep.ps1"))
    return spawn;
    
}

function verifyUpdate(current_dir){
    log("Verifying if there are any new games")
    let recentlyAddedPath = path.win32.join(current_dir,recently_added_games_file);

    return fs.readFileSync(recentlyAddedPath);

    
}

/**
 * Returns the game information - info.json. If does not exist, return undefined
 * @param {String} game_path 
 */
function getGameInfo(game_path){
    let info = path.win32.join(game_path, game_info)
    if(fs.existsSync(info)){
        let data = fs.readFileSync(info, 'utf8')
        let game = JSON.parse(data);

        return game;
            
    }
    else return undefined;

}


/*

 _____       __        _   _       _ _     _       _   _             
|_   _|     / _|      | | | |     | (_)   | |     | | (_)            
  | | _ __ | |_ ___   | | | | __ _| |_  __| | __ _| |_ _  ___  _ __  
  | || '_ \|  _/ _ \  | | | |/ _` | | |/ _` |/ _` | __| |/ _ \| '_ \ 
 _| || | | | || (_) | \ \_/ / (_| | | | (_| | (_| | |_| | (_) | | | |
 \___/_| |_|_| \___/   \___/ \__,_|_|_|\__,_|\__,_|\__|_|\___/|_| |_|


*/

/**
 * Verifies if game object is withing the borders and returns true if valid or undefined if error
 * @param {Object} info 
 */
function validateInfo(info){

    if(isAllGameInfoNotPresent(info)){
        return undefined
    }

    areAuthorsValid(info);
    verifyRequirement(info, 'year')
    verifyRequirement(info, 'genres')
    verifyRequirement(info, 'UC')
    verifyRequirement(info, 'operative_system')
    areMediaAndIconValid(info);
    
    return true;
}

/**
 * Verifies if all the required aspects of the game are defined
 * Goes throught the requirements list and verifies if the game has the required aspect
 * @param {Game Object} info 
 */
function isAllGameInfoNotPresent(info){
    GAME_REQUIREMENTS.forEach(element => {
        if(!(element in info)){
            return true;
        }
    });

    return false;
}

function areAuthorsValid(info){

    for (let i = info.authors.length-1 ; i >= 0; i--) {
        const author = info.authors[i];

        for (let j = 0; j < AUTHOR_REQUIREMENTS.length; j++) {
            const element = AUTHOR_REQUIREMENTS[j];

            if(!(element in author)){
                //Remove author from list
                info.authors.splice(i,1)
                break;
            }
            
        }
    }

    if(info.authors.length == 0){
        addDefaultAuthor(info)
        return;
    }

    return true;
}



function verifyRequirement(info, requirement){
    let requirementOptions;

    switch (requirement) {
        case "genres":
            requirementOptions = GENRE_OPTIONS;
            break;
        
        case "operative_system":
            requirementOptions = OS_OPTIONS;
            break;

        case 'year':
            const current_year = new Date().getFullYear();
            const year = info[requirement];

            if(year > current_year && year< MINIMUM_YEAR ){
                info[requirement] = current_year;
            }
            return;

        case "UC":
            requirementOptions = UC_OPTIONS;
            if(!(requirementOptions.includes(info[requirement])))
            {
                info[requirement] = UC_DEFAULT;
            }
            return;
        default:
            return false;
    }
    
    //Going through the list of info.requirements from end to beggining
    for (let i = info[requirement].length-1 ; i >= 0; i--) {
        const element = info[requirement][i];

        if(!(requirementOptions.includes(element))){
            //Remove element from list
            info[requirement].splice(i,1)
        }
    }

    if(info[requirement].length == 0){
        addDefaultRequirement(info, requirement)
        return;
    }



}

function addDefaultAuthor(info){

    const defaultAuthor = {
        name: AUTHOR_DEFAULT_NAME,
        role: AUTHOR_DEFAULT_ROLE
    };

    info.authors.push(defaultAuthor);
}


function addDefaultRequirement(info, requirement){
    switch (requirement) {
        case "genres":
            info[requirement].push(GENRE_DEFAULT);            
            break;
        
        case "operative_system":
            info[requirement].push(OS_DEFAULT);
            break;
        default:
            break;
    }
}


function areMediaAndIconValid(info){
    const media_path = path.win32.join(games_path, info.name, games_media);
    for (let i = info.media.length-1 ; i >= 0; i--) {
        const element = info.media[i].filename;
        const element_path = path.win32.join(media_path, element);
        if(fs.existsSync(element_path)){
            continue;
        }else{
            info.media.splice(i,1)
        }

    }

    if(fs.existsSync(path.win32.join(media_path, info.icon))){
        return true;
    }else{
        info.icon = ERROR_ON_ICON;
        return false;
    }
}
    
/*

___  ___      _        ______                _   _             
|  \/  |     (_)       |  ___|              | | (_)            
| .  . | __ _ _ _ __   | |_ _   _ _ __   ___| |_ _  ___  _ __  
| |\/| |/ _` | | '_ \  |  _| | | | '_ \ / __| __| |/ _ \| '_ \ 
| |  | | (_| | | | | | | | | |_| | | | | (__| |_| | (_) | | | |
\_|  |_/\__,_|_|_| |_| \_|  \__,_|_| |_|\___|\__|_|\___/|_| |_|

*/


module.exports.get_games = (current_dir)=>{
    // TODO - Git functions
    games_path = path.win32.join(current_dir, ".." ,'renderer',games_diretory);

    return new Promise((resolve, reject)=>{

        let process = updateLocalDatabase(current_dir);
        
        process.on('exit', (exitCode) => {
            log("Update is over")
            if (parseInt(exitCode) !== 0) {
                log("Error on updating databse")
                resolve(getLocalGames());
                return;
            }


            const updateData = verifyUpdate(current_dir);

            if(updateData.length == 0){
                log("No new games found! Reading from local database")
                log("Returning local games")
                resolve(getLocalGames())

            }else{
                log("Found new games. Verifying if they meet demands")
                let newGames = updateData.toString().split('\n');
                let gamesPosValidation = []
                for( let i= 0; i<newGames.length; i++ ){
                    let newGame = newGames[i].split('.',1)[0];
                    log("Verifying game "+ newGame)
                    const game_path =path.win32.join(games_path,newGame) 
                    let info = getGameInfo(game_path)
                    if(info === undefined){
                        log("Did not find info.json for game " + newGame)
                        continue;
                    }
                    //TODO game verification and add to var
                    let gameAfterValidation = validateInfo(info)
                    if(gameAfterValidation === undefined){
                        log("Game " + info.name + " does not meet requirements")
                        continue;
                    }
                    log("Game " + info.name + " meets requirements")
                    gamesPosValidation.push(info);
                }
                save_games(gamesPosValidation)
                
                log("Returning local games")
                resolve(getLocalGames())
            }

            
            });

        })


};

