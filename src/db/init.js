const Database = require('./config')

const initDb = {
    async init(){
        const db = await Database()
        await db.exec(`CREATE TABLE profile(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            avatar TEXT,
            monthly_budget INT,
            days_per_week INT,
            hours_per_day INT,
            vacation_per_year INT,
            value_hour INT
        )`);  

        await db.exec(`CREATE TABLE literals(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            daily_hours INT,
            total_hours INT,
            created_at DATETIME
        )`);

        await db.run(`INSERT INTO profile(
            name,
            avatar,
            monthly_budget,
            days_per_week,
            hours_per_day,
            vacation_per_year
            ) VALUES ("Juan",
            "http://github.com/juanrtalmeida.png",
            3000,
            5,
            4,
            4);`)

        await db.run(`INSERT INTO literals(
            name,
            daily_hours,
            total_hours,
            created_at
            ) VALUES (
                "Tester",
                3,
                10,
                1620416211250
            );`);


        await db.close();
    }
}

initDb.init()