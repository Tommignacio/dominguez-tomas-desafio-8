import container from "./container.js";
import product from "./products.js";
import { options } from "../../dataBase/config/configDB.js";


class Cart extends container {
    constructor() {
        //paso las opciones y el nombre de la tabla
        super(options.mariaDB, "cart")
    }

    async createCart() {
        try {
            // const cart = 
            const newCart = await this.knex.from(this.table)
                .insert({
                    timestamp: this.getNow(),

                })
            console.log(newCart)
            return newCart
        } catch (error) {
            console.log(error)
        }
    }

    // mostrar todos los productos de un carrito
    async showProducts(id) {
        try {
            //lee el carrito
            const cartObj = await this.read();
            //busca el indice del id del carrito
            const idCart = cartObj.findIndex(cart => cart.id == id);
            //muestro los productos del carrito
            return (cartObj[idCart]) === undefined ? `no existe el id ${id}` : cartObj[idCart].productos
        } catch (error) {
            console.log(error)
        }
    }

    //lee productos de la base de datos
    async readProducts() {
        try {
            //verifica que el archivo exista
            await product.createFile()
            //lee los productos
            const products = await fs.promises.readFile(product.pathBD, "utf-8");
            //si el archivo esta vacío
            if (products === "") {
                return `No hay productos en la base de datos`;
            }
            //parseo a array de objetos
            const prodObj = JSON.parse(products)
            return prodObj
        } catch (error) {

        }
    }


    //agregar productos por su id a un carrito
    async addProducts(id, idProducts) {
        try {
            //lee productos de la base de datos
            const productsBd = await this.readProducts()
            //enlista productos al array
            const arrayProducts = await this.listProducts(idProducts, productsBd)
            //lee el carrito
            const cartObj = await this.read();
            //busca el indice del id del carrito
            const idCart = cartObj.findIndex(cart => cart.id == id);
            //guardo el valor de la clave productos del carrito
            let keyProducts = cartObj[idCart].productos;
            //uno array de productos anterior con el nuevo        
            let updateArrayProducts = [...keyProducts, ...arrayProducts]
            //actualizo clave productos con el nuevo array de productos
            cartObj[idCart].productos = updateArrayProducts
            //reescribe el carrito
            this.write(JSON.stringify(cartObj))
            return cartObj
        } catch (error) {
            console.log(error)
        }
    }

    //lisa de productos
    async listProducts(idProducts, prodObj) {
        try {
            //agrego a un array los productos con los id enviados
            const arrayProduct = []
            for (let id of idProducts) {
                for (let product of prodObj) {
                    if (id == product.id) {
                        arrayProduct.push(product)
                    }
                }
            }
            return arrayProduct
        } catch (error) {
            console.log(error)
        }
    }

    //elimina producto del carrito
    async deleteProduct(id, idProduct) {
        try {
            //lee productos del carrito
            const products = await this.showProducts(id)
            //buscar indice del producto a eliminar
            const idProdDelete = products.findIndex(prod => prod.id == idProduct)
            //eliminar producto del carrito
            products.splice(idProdDelete, 1)
            console.log(products)
            //lee el carrito
            const cartObj = await this.read()
            //busca el indice del id del carrito
            const idCart = cartObj.findIndex(cart => cart.id == id);
            //agrego al carrito los productos no eliminados
            cartObj[idCart].productos = products;
            //reescribe el carrito
            this.write(JSON.stringify(cartObj))
            return cartObj
        } catch (error) {
            console.log(error)
        }
    }

    // //agregar todos los  productos a un carrito
    // async addProduct(id) {
    //     try {
    //         console.log(product.pathBD)
    //         //verifica que el archivo exista
    //         await this.createFile()
    //         //lee los productos
    //         const products = await fs.promises.readFile(product.pathBD, "utf-8");
    //         //si el archivo esta vacío
    //         if (products === "") {
    //             return `No hay productos en la base de datos`;
    //         }
    //         //parseo a objeto 
    //         const prodObj = JSON.parse(products)
    //         //lee el carrito
    //         const cartObj = await this.read();
    //         //agrego al carrito los productos
    //         cartObj[id].productos = prodObj
    //         //reescribe la base de datos
    //         this.write(JSON.stringify(cartObj))
    //         console.log(cartObj)
    //         return cartObj
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }


}

const cart = new Cart()
export default cart