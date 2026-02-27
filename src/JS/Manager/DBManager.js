import Database from 'better-sqlite3'
import * as path from 'path'

const db_path = path.resolve("./data/data.db")
export const db = new Database(db_path)

function checkTableBuild(name){
    const row = db.prepare(`SELECT name FROM sqlite_master WHERE type='table' AND name='${name}'`).get();
    return row;
};

export function buildDB(){
    createGamesTable();
    createSupportsTable();
    createTagsTable();
    createGameSupportsTable();
    createGameTagsTable();
};

function createGamesTable(){
    if (!checkTableBuild("games")){
        db.exec(`
            CREATE TABLE IF NOT EXISTS games (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,    
                img_path TEXT NOT NULL,    
                playtime INTEGER,
                rating INTEGER
            )
        `);
    }        
};

function createSupportsTable(){
    if (!checkTableBuild("supports")){
        db.exec(`
            CREATE TABLE IF NOT EXISTS supports (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                icon_path TEXT NOT NULL
            )
        `);
    }        
};

function createTagsTable(){
    if (!checkTableBuild("tags")){
        db.exec(`
            CREATE TABLE IF NOT EXISTS tags (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL
            )
        `);
    }        
};

function createGameSupportsTable(){
    if (!checkTableBuild("game_supports")){
        db.exec(`
            CREATE TABLE IF NOT EXISTS game_supports (
                game_id INTEGER NOT NULL,
                support_id INTEGER NOT NULL,
                PRIMARY KEY (game_id, support_id)
            )
        `);
    }        
};

function createGameTagsTable(){
    if (!checkTableBuild("game_tags")){
        db.exec(`
            CREATE TABLE IF NOT EXISTS game_tags (
                game_id INTEGER NOT NULL,
                tag_id INTEGER NOT NULL,
                PRIMARY KEY (game_id, tag_id)
            )
        `);
    }        
};