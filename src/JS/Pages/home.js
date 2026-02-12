

const btn = document.getElementById("btn")

async function logData() {
    const reponse = await fetch("/DB/games");
    const games = await reponse.json();
    btn.textContent = games
}



btn.addEventListener('click', async function () {
    btn.textContent =" wasd"
    
});

logData();