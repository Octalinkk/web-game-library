import { db } from "./DBManager.js";

export function getGameSupports(){
     try {
        const query = `SELECT * FROM game_supports`
        const readQuery = db.prepare(query)
        const rowList = readQuery.all()
        return rowList
    } catch (err) {
        console.error(err)
        throw err
    }
}

export function getGamesbySupportId(support_id){
     try {
        const query = `SELECT game_id FROM game_supports WHERE support_id = ?`
        const readQuery = db.prepare(query)
        const rowList = readQuery.all(support_id)
        return rowList
    } catch (err) {
        console.error(err)
        throw err
    }
}


export function getSupportbyGameId(game_id){
     try {
        const query = `SELECT support_id FROM game_supports WHERE game_id = ?`
        const readQuery = db.prepare(query)
        const rowList = readQuery.all()
        return rowList
    } catch (err) {
        console.error(err)
        throw err
    }
}

export function addGameSupport(game_id, support_id) {
    try {
        let resquestInfo = null; 
        const insertQuery = db.prepare(
            `INSERT INTO game_supports (game_id, support_id) VALUES (?, ?)`
        );

        // Execute the query with parameters
        const transaction = db.transaction(() => {
            const info = insertQuery.run(game_id, support_id);
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

export function deleteGameSupportbyGameId(gameId){
     try {
        const query = `DELETE FROM game_supports WHERE id = ?`
        const readQuery = db.prepare(query)
        const rowList = readQuery.run(gameId)
        return rowList
    } catch (err) {
        console.error(err)
        throw err
    }
}

export function deleteGameSupportbySupportId(supportId){
     try {
        const query = `DELETE FROM game_supports WHERE id = ?`
        const readQuery = db.prepare(query)
        const rowList = readQuery.run(supportId)
        return rowList
    } catch (err) {
        console.error(err)
        throw err
    }
}