import knex from 'knex';

export default class Container {
	constructor(options, table) {
		this.knex = knex(options);
		this.table = table;
	}

	//devuelve toda la base de datos
	async getAll() {
		try {
			const db = await this.knex(this.table)
				.select("*");
			return db;
		} catch (error) {
			throw new Error(`Error: ${error}`);
		}
	}

	//elimina objeto por su id
	async deleteById(id) {
		try {
			const deleteElement = await this.knex.from(this.table)
				.where("id", id)
				.del()
			return deleteElement
		} catch (error) {
			throw new Error(`Error: ${error}`);
		}
	}
	//hora
	getNow() {
		try {
			const now = new Date();
			return `${now.getHours()}:${now.getMinutes()}`;
		} catch (error) {
			throw new Error(`Error: ${error}`);
		}
	};

}

