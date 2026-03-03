import express from 'express'
import { buildDB } from "./src/JS/Manager/DBManager.js";
import { getGames, getGamesbyAlpha, getGamesbyPlaytime, getGamesbyRating, addGame, getGamebyID } from "./src/JS/Manager/GameManager.js";
import { getSupports, getSupportsbyAlpha, addSupport, getSupportsbyID } from "./src/JS/Manager/SupportsManager.js";
import { getTags, getTagssbyAlpha, addTag, getTagsbyID } from "./src/JS/Manager/TagManager.js";
import { getGamesbySupportId, getSupportbyGameId, addGameSupport } from "./src/JS/Manager/GameSupportsManager.js";
import { getGamesbyTagId, getTagsbyGameId, addGameTag } from "./src/JS/Manager/GameTagsManager.js";

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

app.get("/DB/games/get/playtime", (req, res) => {
    const games = getGamesbyPlaytime(); 
    res.json(games);
});

app.get("/DB/games/get/rating", (req, res) => {
    const games = getGamesbyRating(); 
    res.json(games);
});

app.get("/DB/games/:id", (req, res) => {
    const games = getGamebyID(req.params.id); 
    res.json(games);
})

app.get("/DB/supports/get/all", (req, res) => {
    const supports = getSupports(); 
    res.json(supports);
});

app.get("/DB/supports/get/alpha", (req, res) => {
    const supports = getSupportsbyAlpha(); 
    res.json(supports);
});

app.get("/DB/supports/:id", (req, res) => {
    const supports = getSupportsbyID(req.params.id); 
    res.json(supports);
})

app.get("/DB/tags/get/all", (req, res) => {
    const tags = getTags(); 
    res.json(tags);
});

app.get("/DB/tags/get/alpha", (req, res) => {
    const tags = getTagssbyAlpha(); 
    res.json(tags);
});

app.get("/DB/tags/:id", (req, res) => {
    const tags = getTagsbyID(req.params.id); 
    res.json(tags);
})



app.get("/DB/game-supportID/:id", (req, res) => {
    const games = getGamesbySupportId(req.params.id); 
    res.json(games);
})

app.get("/DB/support-gameID/:id", (req, res) => {
    const supports = getSupportbyGameId(req.params.id); 
    res.json(supports);
})

app.get("/DB/game-tagID/:id", (req, res) => {
    const games = getGamesbyTagId(req.params.id); 
    res.json(games);
})

app.get("/DB/tag-gameID/:id", (req, res) => {
    const supports = getTagsbyGameId(req.params.id); 
    res.json(supports);
})



app.use(express.static(path.resolve("./src")));
app.use(express.static(path.resolve("./data")));
app.use(express.static(path.resolve("./res")));

app.listen(PORT, () => {
    console.log("Running on localhost:8080")
});