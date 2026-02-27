

const grid = document.getElementById("game-grid")
const selectFilter = document.getElementById("filter")

async function getAllGames() {
    const reponse = await fetch("/DB/games/get/alpha");
    const games = await reponse.json();
    return games
}

async function getAllGamesByPlaytime() {
    const reponse = await fetch("/DB/games/get/playtime");
    const games = await reponse.json();
    return games
}

async function getAllGamesByRating() {
    const reponse = await fetch("/DB/games/get/rating");
    const games = await reponse.json();
    return games
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


document.addEventListener("DOMContentLoaded", async function () {
    
    const games = await getAllGames();

    displayGames(games)
});

selectFilter.addEventListener("change", async function(event) {
    const selectedId = event.target.value;
    var games
    if (selectedId==1)
    {
        games = await getAllGames();
    }
    if (selectedId==2){
        games = await getAllGamesByPlaytime();
    }
    if (selectedId==3){
        games = await getAllGamesByRating();
    } 

    displayGames(games);
    
});

async function displayGames(games){

    grid.innerHTML = ""

    for (const game of games) {
        
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
            console.log(tag)
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
          <div class="game-rating">
            <span class="stars">${stars}</span>
            <span class="rate"><span>${rating}</span>/10</span>
          </div>
          <div class="tags-list">`
          for (const tag of tags) {
            card += `<span class="tag">${tag.name}</span>`
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
