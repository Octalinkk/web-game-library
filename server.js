import express from 'express'
import { buildDB } from "./src/JS/Manager/DBManager.js";
import { getGames, getGamesbyAlpha, addGame, getGamebyID, deleteGamebyID } from "./src/JS/Manager/GameManager.js";

import * as path from 'path'

const app = express();
const PORT = 8080;
buildDB()


app.get("/", (req, res) => {
    res.sendFile(path.resolve("./src/HTML/home.html"));
});

app.get("/DB/games/get/all", (req, res) => {
    const games = getGames(); 
    res.json(games);
});

app.get("/DB/games/get/alpha", (req, res) => {
    const games = getGamesbyAlpha(); 
    res.json(games);
});

app.get("/DB/games/:id", (req, res) => {
    const games = getGamebyID(req.params.id); 
    res.json(games);
})




app.use(express.static(path.resolve("./src")));
app.use(express.static(path.resolve("./data")));
app.use(express.static(path.resolve("./res")));

app.listen(PORT, () => {
    console.log("Running on localhost:8080")
});