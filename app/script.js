import { buildDB } from "./DBManager.js";

const btn = document.getElementById("btn")


btn.addEventListener('click', async function () {
    buildDB()
});