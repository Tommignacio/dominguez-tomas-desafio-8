import { options } from './config/configDB.js';
import knex from 'knex';

(async () => {
    const mariaDB = knex(options.mariaDB);
    const sqliteDB = knex(options.sqlite);
    try {
        /*crea la tabla products */
        await mariaDB.schema.createTableIfNotExists('products', (table) => {
            table.increments('id').primary();
            table.string('name');
            table.string('description');
            table.integer('price');
            table.integer('stock');
            table.string('thumbnail');
            table.string('code');
        });
        console.log('tabla products creada');

        /*crea la tabla Cart */
        await mariaDB.schema.createTableIfNotExists('cart', (table) => {
            table.increments('id').primary();
            table.string("timestamp");
            table.specificType('products_id', 'integer ARRAY')
            table.foreign('products_id')
                .references('products.id');

        });
        console.log('tabla cart creada');
    } catch (err) {
        console.log(err);
    }
})();