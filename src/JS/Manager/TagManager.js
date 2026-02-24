import { db } from "./DBManager.js";

export function getTags(){
     try {
        const query = `SELECT * FROM tags`
        const readQuery = db.prepare(query)
        const rowList = readQuery.all()
        return rowList
    } catch (err) {
        console.error(err)
        throw err
    }
}

export function getTagssbyAlpha(){
     try {
        const query = `SELECT * FROM tags ORDER BY name DESC`
        const readQuery = db.prepare(query)
        const rowList = readQuery.all()
        return rowList
    } catch (err) {
        console.error(err)
        throw err
    }
}


export function getTagsbyID(tagId) {
    try {
        const query = `SELECT * FROM tags WHERE id = ?`
        const readQuery = db.prepare(query)
        const rowList = readQuery.get(tagId)
        return rowList
    } catch (err) {
        console.error(err)
        throw err
    }
}

export function addTag(name) {
    try {
        let resquestInfo = null; 
        const insertQuery = db.prepare(
            `INSERT INTO tags (name) VALUES (?)`
        );

        // Execute the query with parameters
        const transaction = db.transaction(() => {
            const info = insertQuery.run(name);
            resquestInfo = info;
            console.log(
                `Inserted ${info.changes} rows with last ID ${info.lastInsertRowid} into tags`
            );
        });
        transaction();
        return resquestInfo;
    } catch (err) {
        console.error(err)
        throw err
    }
}

export function deleteTagbyID(gameId){
     try {
        const query = `DELETE FROM tags WHERE id = ?`
        const readQuery = db.prepare(query)
        const rowList = readQuery.run(gameId)
        return rowList
    } catch (err) {
        console.error(err)
        throw err
    }
}