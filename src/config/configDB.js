import "dotenv/config"

export const options = {
    mariaDB: {
        client: "mysql",
        connection: {
            host: "127.0.0.1",
            user: "root",
            password: process.env.DB_PASSWORD,
            database: "test"
        },
        pool: { min: 0, max: 10 }
    },
    sqlite: {
        client: "sqlite3",
        connection: {
            // filename: "./db.sqlite",
            filename: "../dataBase/ecommerce.sqlite"
        },
        useNullAsDefault: true,
    }
}