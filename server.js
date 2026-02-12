import express from 'express'
import { buildDB, getGames } from "./src/JS/Manager/DBManager.js";

import * as path from 'path'

const app = express();
const PORT = 8080;
buildDB()

app.get("/", (req, res) => {
    res.sendFile(path.resolve("./src/HTML/home.html"));
});

app.get("/DB/games", (req, res) => {
    const users = getGames(); // On appelle ta méthode exportée
    res.json(users);
});



app.use(express.static(path.resolve("./src")));

app.use(express.static(path.resolve("./data")));

app.listen(8080, () => {
    console.log("Running on localhost:8080")
});