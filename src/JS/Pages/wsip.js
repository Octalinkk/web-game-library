const lockin_scr = document.getElementById("lockin_scr")
const duration_scr = document.getElementById("duration_scr")
const story_scr = document.getElementById("story_scr")
const release_scr = document.getElementById("release_scr")
const straight_scr = document.getElementById("straight_scr")
const complex_scr = document.getElementById("complex_scr")
const player_scr = document.getElementById("player_scr")
const tag_select = document.getElementById("tag_select")
const btnCalc = document.getElementById("calc")

async function getAllGamesID() {
    const reponse = await fetch("/DB/games/get/all/ID");
    const games = await reponse.json();
    return games
}

async function getGameById(game_id) {
    const reponse = await fetch("/DB/games/"+game_id);
    const games = await reponse.json();
    return games
}

async function getGamesIdByTagId(tag_id) {
    const reponse = await fetch("/DB/game-tagID/"+tag_id);
    const tags = await reponse.json();
    return tags
}

async function getGamesIDByTag() {
    const selectedId = tag_select.value;
    let gamesID = []
    let gamesByTag
    switch (Number(selectedId)){
        case 1:
            gamesByTag = await getGamesIdByTagId(1);
            concatArray(gamesID, gamesByTag)
            gamesByTag = await getGamesIdByTagId(8);
            concatArray(gamesID, gamesByTag)
            gamesByTag = await getGamesIdByTagId(12);
            concatArray(gamesID, gamesByTag)
            gamesByTag = await getGamesIdByTagId(14);
            concatArray(gamesID, gamesByTag)
            gamesByTag = await getGamesIdByTagId(18);
            concatArray(gamesID, gamesByTag)
            gamesByTag = await getGamesIdByTagId(19);
            concatArray(gamesID, gamesByTag)
            gamesByTag = await getGamesIdByTagId(21);
            concatArray(gamesID, gamesByTag)
            gamesByTag = await getGamesIdByTagId(26);
            concatArray(gamesID, gamesByTag)
            gamesByTag = await getGamesIdByTagId(18);
            concatArray(gamesID, gamesByTag)
            break;
        case 2:
            gamesByTag = await getGamesIdByTagId(7);
            concatArray(gamesID, gamesByTag)
            gamesByTag = await getGamesIdByTagId(9);
            concatArray(gamesID, gamesByTag)
            gamesByTag = await getGamesIdByTagId(17);
            
            concatArray(gamesID, gamesByTag)
            gamesByTag = await getGamesIdByTagId(20);
            
            concatArray(gamesID, gamesByTag)
            gamesByTag = await getGamesIdByTagId(24);
            
            concatArray(gamesID, gamesByTag)
            gamesByTag = await getGamesIdByTagId(25);
            
            concatArray(gamesID, gamesByTag)
            break;
        case 3:
            gamesByTag = await getGamesIdByTagId(13);
            
            concatArray(gamesID, gamesByTag)
            break;
        case 4:
            gamesByTag = await getGamesIdByTagId(14);
            
            concatArray(gamesID, gamesByTag)
            gamesByTag = await getGamesIdByTagId(16);
            
            concatArray(gamesID, gamesByTag)
            break;
        case 5:
            gamesByTag = await getGamesIdByTagId(23);
            
            concatArray(gamesID, gamesByTag)
            break;
        case 6:
            gamesID = await getAllGamesID();
            break;
        default :
            gamesID = await getAllGamesID();
            break;
    }
    return gamesID
}

async function getGamesToSort() {
    
    let gamesID = await getGamesIDByTag();

    let games = [];

    for (const id of gamesID) {
        const game = await getGameById(id);
        games.filter(f => f !== game).concat([game])
    }
    return games;
}


btnCalc.addEventListener("click", async function(event) {
    
    const games = getGamesToSort()
});


function concatArray(arr1, arr2) {
    for (const item of arr2) {
        if (!arr1.includes(item.game_id)){
            arr1.push(item.game_id)
        }
    }
}