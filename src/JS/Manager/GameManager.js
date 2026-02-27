import { db } from "./DBManager.js";

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

export function getGamesbyAlpha(){
     try {
        const query = `SELECT * FROM games ORDER BY name ASC`
        const readQuery = db.prepare(query)
        const rowList = readQuery.all()
        return rowList
    } catch (err) {
        console.error(err)
        throw err
    }
}

export function getGamesbyPlaytime(){
     try {
        const query = `SELECT * FROM games ORDER BY playtime DESC`
        const readQuery = db.prepare(query)
        const rowList = readQuery.all()
        return rowList
    } catch (err) {
        console.error(err)
        throw err
    }
}

export function getGamesbyRating(){
     try {
        const query = `SELECT * FROM games ORDER BY rating DESC`
        const readQuery = db.prepare(query)
        const rowList = readQuery.all()
        return rowList
    } catch (err) {
        console.error(err)
        throw err
    }
}


export function getGamebyID(gameId) {
    try {
        const query = `SELECT * FROM games WHERE id = ?`
        const readQuery = db.prepare(query)
        const rowList = readQuery.get(gameId)
        return rowList
    } catch (err) {
        console.error(err)
        throw err
    }
}

export function addGame(name, img_path, playtime, rating) {
    try {
        let resquestInfo = null; 
        const insertQuery = db.prepare(
            `INSERT INTO games (name, img_path, playtime, rating) VALUES (?, ?, ?, ?)`
        );

        // Execute the query with parameters
        const transaction = db.transaction(() => {
            const info = insertQuery.run(name, img_path, playtime, rating);
            resquestInfo = info;
            console.log(
                `Inserted ${info.changes} rows with last ID ${info.lastInsertRowid} into games`
            );
        });
        transaction();
        return resquestInfo;
    } catch (err) {
        console.error(err)
        throw err
    }
}

export function deleteGamebyID(gameId){
     try {
        const query = `DELETE FROM games WHERE id = ?`
        const readQuery = db.prepare(query)
        const rowList = readQuery.run(gameId)
        return rowList
    } catch (err) {
        console.error(err)
        throw err
    }
}