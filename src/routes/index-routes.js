import { Router } from 'express'
const router = Router();
import routerProducts from "./products/route-products.js"
import routerCart from "./products/route-cart.js"


router.use("/api/productos", routerProducts)
router.use("/api/carrito", routerCart)



export default router;
