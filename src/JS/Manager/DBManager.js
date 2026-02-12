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
};

function createGamesTable(){
    if (!checkTableBuild("games")){
        db.exec(`
            CREATE TABLE IF NOT EXISTS games (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL               
            )
        `);
    }
        
};
export function getGames(){
     try {
        const query = `SELECT * FROM games`
        const readQuery = db.prepare(query)
        const rowList = readQuery.all()
        return rowList
    } catch (err) {
        console.error(err)
        throw err
    }
}
