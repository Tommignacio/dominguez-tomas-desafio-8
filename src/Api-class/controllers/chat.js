import { options } from "../../dataBase/config/configDB.js";
import container from "./container.js"

class Chats extends container {
    constructor() {
        super(options.sqlite, "chats")
    }
}

const chat = new Chats()
export default chat