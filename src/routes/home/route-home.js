import { Router } from "express";
const routerIndex = Router()

routerIndex.get("/", async (req, res) => {
    try {
        return res.render("index");
    } catch (error) {
        console.log(error)
    }
})
export default routerIndex