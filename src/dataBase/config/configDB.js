import "dotenv/config"

//importo path para poder usar __dirname
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


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
            filename: (__dirname + "/ecommerce.sqlite")
        },
        useNullAsDefault: true,
    }

}
console.log(__dirname)