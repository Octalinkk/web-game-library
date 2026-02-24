import { db } from "./DBManager.js";

export function getSupports(){
     try {
        const query = `SELECT * FROM supports`
        const readQuery = db.prepare(query)
        const rowList = readQuery.all()
        return rowList
    } catch (err) {
        console.error(err)
        throw err
    }
}

export function getSupportsbyAlpha(){
     try {
        const query = `SELECT * FROM supports ORDER BY name DESC`
        const readQuery = db.prepare(query)
        const rowList = readQuery.all()
        return rowList
    } catch (err) {
        console.error(err)
        throw err
    }
}


export function getSupportsbyID(supportId) {
    try {
        const query = `SELECT * FROM supports WHERE id = ?`
        const readQuery = db.prepare(query)
        const rowList = readQuery.get(supportId)
        return rowList
    } catch (err) {
        console.error(err)
        throw err
    }
}

export function addSupport(name, icon_path) {
    try {
        let resquestInfo = null; 
        const insertQuery = db.prepare(
            `INSERT INTO supports (name, icon_path) VALUES (?, ?)`
        );

        // Execute the query with parameters
        const transaction = db.transaction(() => {
            const info = insertQuery.run(name, icon_path);
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

export function deleteSupportsbyID(supportId){
     try {
        const query = `DELETE FROM supports WHERE id = ?`
        const readQuery = db.prepare(query)
        const rowList = readQuery.run(supportId)
        return rowList
    } catch (err) {
        console.error(err)
        throw err
    }
}