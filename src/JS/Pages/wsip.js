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
const title = document.getElementById("title")
const formDiv = document.getElementById("form")
const resDiv = document.getElementById("result")
const grid = document.getElementById("game-grid")
const btnAgain = document.getElementById("again")

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

async function getSupportbyID(supportId) {
    const reponse = await fetch("/DB/supports/"+supportId);
    const support = await reponse.json();
    return support
}

async function getSupportsbyGameID(game_id) {
    const reponse = await fetch("/DB/support-gameID/"+game_id);
    const supports = await reponse.json();
    return supports
}

async function getTagById(tag_id) {
    const reponse = await fetch("/DB/tags/"+tag_id);
    const support = await reponse.json();
    return support
}

async function getTagsbyGameID(game_id) {
    const reponse = await fetch("/DB/tag-gameID/"+game_id);
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
    title.classList.remove("hidden")
    displayGames(chosen_games);
});

btnAgain.addEventListener("click", async function(event) {
    grid.innerHTML = ""
    resDiv.classList.add("hidden");
    formDiv.classList.remove("hidden");
});

function concatArray(arr1, arr2) {
    for (const item of arr2) {
        if (!arr1.includes(item.game_id)){
            arr1.push(item.game_id)
        }
    }
}

async function displayGames(games){

    grid.innerHTML = ""
    for (const g of games) {
        const game = g.game       
        const supportsId = await getSupportsbyGameID(game.id);
        const tagsId = await getTagsbyGameID(game.id);
        let supports = []
        for (const elem of supportsId) {
            const support = await getSupportbyID(elem.support_id)
            supports.push(support)
        }
        let tags = []
        for (const elem of tagsId) {
            const tag = await getTagById(elem.tag_id)
            tags.push(tag)
        }
        grid.innerHTML += createCard(game, supports, tags)
    }
}

function createCard(game, supports, tags){

    const img_path = game.img_path.replace("./res", "")
    const rating = game.rating
    const stars = getStars(rating)
    const playtime = game.playtime

    let card = `<div class="game-card">
        <img class="card-bg" src="${img_path}">
        <div class="game-context">
          <div class="game-info">
            <div class="hours">${playtime} h</div>
            <div class="supports">`
            for (const support of supports) {
                const match = support.icon_path.replace("./res", "").replace("/icon", "").replace(".png", "")
                switch (match){
                    case "/3ds": {card += `<div class="icon ds"><img src="/icon/3ds.png"></div>`; break;}
                    case "/epic": {card += `<div class="icon epic"><img src="/icon/epic.png"></div>`; break;}
                    case "/ps": {card += `<div class="icon ps"><img src="/icon/ps.png"></div>`; break;}
                    case "/steam": {card += `<div class="icon steam"><img src="/icon/steam.png"></div>`; break;}
                    case "/switch": {card += `<div class="icon switch"><img src="/icon/switch.png"></div>`; break;}
                    case "/wii": {card += `<div class="icon wii"><img src="/icon/wii.png"></div>`; break;}
                }                
            }
            card += `</div>
          </div>
          <div class="game-rating">`
            if (game.playtime > 0) {
                card += `<span class="stars">${stars}</span>
                        <span class="rate"><span>${rating}</span>/10</span>`
            }
            else {
                card += `<span class="np">Never Played</span>`
            }
            
        card += `
          </div>
          <div class="tags-list">`
          for (const tag of tags) {
            card += `<span class="tag">${tag.name}</span>`
          }            
          card += `</div>
          <div class="labels">`
            if(tags.some(tag => tag.name === 'Coup de coeur')) {
                card += `<div class="label"><img src="/icon/heart.png"></div>`
            }
            if(tags.some(tag => tag.name === '100%')) {
                card += `<div class="label"><img src="/icon/completion.png"></div>`
            }
            card += `</div>
        </div>
      </div>`

    return card
}

function getStars(rating) {
    let nbrEtoiles = Math.floor(rating / 2);

    let reste = rating % 2;

    let stars = "★".repeat(nbrEtoiles);

    if (reste !== 0) {
        stars += "⯪";
    }

    if (5-nbrEtoiles >= 1) {
        var offset = 0
        if (reste !== 0) {
            offset = 1
        }
        stars += "☆".repeat(5-nbrEtoiles-offset)
    }    

    return stars
}