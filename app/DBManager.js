import Database from 'better-sqlite3'
import * as path from 'path'

const db_path = path.resolve("./../data/data.db")
export const db = new Database(db_path)

function checkTableBuild(name){
    const row = db.prepare(`SELECT name FROM sqlite_master WHERE type='table' AND name='${name}'`).get();
    return row;
};

export function buildDB(){
    createUsersTable();
};

function createUsersTable(){
    if (!checkTableBuild("games")){
        db.exec(`
            CREATE TABLE IF NOT EXISTS games (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL               
            )
        `);
    }
        
};
