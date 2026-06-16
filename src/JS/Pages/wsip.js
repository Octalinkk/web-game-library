const lockin_scr = document.getElementById("lockin_scr")
const duration_scr = document.getElementById("duration_scr")
const story_scr = document.getElementById("story_scr")
const release_scr = document.getElementById("release_scr")
const straight_scr = document.getElementById("straight_scr")
const complex_scr = document.getElementById("complex_scr")
const player_scr = document.getElementById("player_scr")
const tag_select = document.getElementById("tag_select")
const btnCalc = document.getElementById("calc")


const loading = document.getElementById("loading")
const loader = document.getElementById("loader")
const formDiv = document.getElementById("form")
const resDiv = document.getElementById("result")

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
    loading.innerText = "Searching games..."
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
    
    loading.innerText = "Collecting games..."
    const gamesID = await getGamesIDByTag();

    let games = [];

    for (const id of gamesID) {
        const game = await getGameById(id);
        games.push(game)
    }
    return games;
}


btnCalc.addEventListener("click", async function(event) {
    resDiv.classList.remove("hidden");
    formDiv.classList.add("hidden");
    
    const games = await getGamesToSort()
    
    loading.innerText = "Sorting games..."
    let chosen_games = []

    for (const g of games) {

        const lockin_diff =     Math.abs(lockin_scr.value   - g.lockin_scr)
        const duration_diff =   Math.abs(duration_scr.value - g.duration_scr)
        const story_diff =      Math.abs(story_scr.value    - g.story_scr)
        const release_diff =    Math.abs(release_scr.value  - g.release_scr)
        const straight_diff =   Math.abs(straight_scr.value - g.straight_scr)
        const complex_diff =    Math.abs(complex_scr.value  - g.complex_scr)
        const player_diff =     Math.abs(player_scr.value   - g.player_scr)
        console.log(g.name)
        console.log(lockin_diff)
        console.log(duration_diff)
        console.log(story_diff)
        console.log(release_diff)
        console.log(straight_diff)
        console.log(complex_diff)
        console.log(player_diff)

        const s = lockin_diff + duration_diff + story_diff + release_diff + straight_diff + complex_diff + player_diff

        if (lockin_diff <= 5 && 
            duration_diff <= 5 && 
            story_diff <= 5 &&  
            release_diff <= 5 &&  
            straight_diff <= 5 &&  
            complex_diff <= 5 &&  
            player_diff <= 5 &&
            s <= 30)
            {
                chosen_games.push({game:g, score:s})
            }
    }
    
    chosen_games.sort((a, b) => a.score - b.score)
    
    loading.innerText = "DONE !"
    loader.classList.add("hidden");
    console.log(chosen_games)
});


function concatArray(arr1, arr2) {
    for (const item of arr2) {
        if (!arr1.includes(item.game_id)){
            arr1.push(item.game_id)
        }
    }
}