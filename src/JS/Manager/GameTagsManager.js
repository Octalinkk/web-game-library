import { db } from "./DBManager.js";

export function getGamesTags(){
     try {
        const query = `SELECT * FROM game_tags`
        const readQuery = db.prepare(query)
        const rowList = readQuery.all()
        return rowList
    } catch (err) {
        console.error(err)
        throw err
    }
}

export function getGamesbyTagId(tag_id){
     try {
        const query = `SELECT game_id FROM game_tags WHERE tag_id = ?`
        const readQuery = db.prepare(query)
        const rowList = readQuery.all(tag_id)
        return rowList
    } catch (err) {
        console.error(err)
        throw err
    }
}


export function getTagsbyGameId(game_id){
     try {
        const query = `SELECT tag_id FROM game_tags WHERE game_id = ?`
        const readQuery = db.prepare(query)
        const rowList = readQuery.all(game_id)
        return rowList
    } catch (err) {
        console.error(err)
        throw err
    }
}

export function addGameTag(game_id, tag_id) {
    try {
        let resquestInfo = null; 
        const insertQuery = db.prepare(
            `INSERT INTO game_tags (game_id, tag_id) VALUES (?, ?)`
        );

        // Execute the query with parameters
        const transaction = db.transaction(() => {
            const info = insertQuery.run(game_id, tag_id);
            resquestInfo = info;
            console.log(
                `Inserted ${info.changes} rows with last ID ${info.lastInsertRowid} into game_tags`
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
        const query = `DELETE FROM game_tags WHERE id = ?`
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
        const query = `DELETE FROM game_tags WHERE id = ?`
        const readQuery = db.prepare(query)
        const rowList = readQuery.run(supportId)
        return rowList
    } catch (err) {
        console.error(err)
        throw err
    }
}