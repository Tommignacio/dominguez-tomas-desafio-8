import { Router } from 'express'
const router = Router();
import routerProducts from "./products/route-products.js"
import routerCart from "./products/route-cart.js"
import routerIndex from './home/route-home.js';


router.use("/home", routerIndex)
router.use("/api/productos", routerProducts)
router.use("/api/carrito", routerCart)



export default router;
