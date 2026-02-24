

const btn = document.getElementById("game-grid")

async function getAllGames() {
    const reponse = await fetch("/DB/games/get/all");
    const games = await reponse.json();
    return games
}


document.addEventListener("DOMContentLoaded", async function () {
    
    const games = await getAllGames();

    for (const element of games) {
        console.log(element.name)
    }
});


btn.addEventListener('click', async function () {
    btn.textContent =" wasd"
    
});
