import { options } from "../../config/configDB.js";
import container from "./container.js"


class Products extends container {
    constructor() {
        //paso las opciones y el nombre de la tabla
        super(options.mariaDB, "products")
    }

    async insertProduct(obj) {
        try {
            const addProduct = await this.knex.from(this.table)
                .insert(obj)
            return addProduct;
        } catch (error) {
            throw new Error(`Error al insertar: ${error}`);
        }
    }

    //devuelve el producto por su ID
    async getById(id) {
        try {
            const product = await this.knex.from(this.table)
                .select('*')
                .where('id', id);
            return product.length === 0 ? `no existe el producto con el id ${id}` : product
        } catch (error) {
            throw new Error(`Error: ${error}`);
        }
    }

    //actualizar producto con uno nuevo
    async update(obj, id) {
        try {
            const dbUpdated = await this.knex(this.table)
                .where("id", id)
                .update(obj)
            return dbUpdated;
        } catch (error) {
            throw new Error(`Error: ${error}`);
        }
    }


}

const product = new Products()
export default product
