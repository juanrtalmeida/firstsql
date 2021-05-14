const database = require("../db/config")
module.exports = {
    async get(){

        const db = await database()
        const data = await db.all(`SELECT * FROM literals`)

        await db.close()
        return data.map(item => ({
                id:item.id,
                name:item.name,
                "daily-hours":item["daily_hours"],
                "total-hours":item["total_hours"],
                created_at:item["created_at"]
            }
        ));
    },

    async update(newData, dataId){
        const db = await database()
        await db.run(`UPDATE literals SET
        name = "${newData.name}",
        daily_hours = ${newData["daily-hours"]},
        total_hours = ${newData["total-hours"]}
        WHERE id = ${dataId}
        `)
        await db.close()
    },

    async delete(id){
        const db = await  database()
        db.run(`DELETE FROM literals WHERE id=${id}`)
        await db.close()
    },

    async create(newData){
        const db = await database()
        await db.run(`INSERT INTO literals(
            name,
            daily_hours,
            total_hours,
            created_at
        ) VALUES (
            "${newData.name}",
            ${newData["daily-hours"]},
            ${newData["total-hours"]},
            ${newData.created_at}
        )`)
        await db.close()
    }
}