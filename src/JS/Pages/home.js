

const grid = document.getElementById("game-grid")

async function getAllGames() {
    const reponse = await fetch("/DB/games/get/all");
    const games = await reponse.json();
    return games
}


document.addEventListener("DOMContentLoaded", async function () {
    
    const games = await getAllGames();

    for (const game of games) {
        grid.innerHTML += createCard(game)
    }
});

function createCard(game){
    const img_path = game.img_path.replace("./res", "")
    const rating = game.rating
    const stars = getStars(rating)
    const playtime = game.playtime


    return `<div class="game-card">
        <img src="${img_path}">
        <div class="game-context">
          <span class="hours">${playtime} h</span>
          <div class="game-rating">
            <span class="stars">${stars}</span>
            <span class="rate"><span>${rating}</span>/10</span>
          </div>
          <div class="tags-list">
            <span class="tag">Souls</span>
          </div>
        </div>
      </div>`
}

function getStars(rating) {
    let nbrEtoiles = Math.floor(rating / 2);
    console.log(nbrEtoiles)

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
