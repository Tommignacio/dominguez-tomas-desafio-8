import express from "express";
const app = express();
import { Server as ioServer } from "socket.io";
import http from "http";
import morgan from "morgan";
import routes from "./routes/index-routes.js";
import chat from "./Api-class/controllers/chat.js";


//importo path para poder usar __dirname
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


//creo servidores
const httpServer = http.createServer(app); //creo servidor http
const io = new ioServer(httpServer); //creo servidor io Websocket

//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(__dirname + "/public")); //dirname sirve para que si abro desde otro directoro, siempre encontrara la carpeta publica
app.use(express.urlencoded({ extended: true })); //sirve para leer los datos enviados por html formulario

//middleware error
const ruteError = async function (req, res, next) {
	//mensaje de error al no existir la ruta
	return res
		.status(404)
		.json({ error: -2, description: `route '${req.originalUrl}' method '${req.method}' not implemented` });
};

//config plantilla
app.set("views", "public/views"); //nombre de la carpeta, ruta donde esta
app.set("view engine", "ejs");

//Rutas
app.use("/", routes);


//array de mensajes
// const messages = []

//servidor socket para chat
io.on("connection", (socket) => {
	console.log("servidor conectado")
	socket.on("newMessage", async (objMessage) => {
		// console.log(objMessage)
		await chat.insertElement(objMessage)
		socket.emit("messages", objMessage)
	})

})

app.use("/*", ruteError)

//empezando servidor
const PORT = 8080;
try {
	httpServer.listen(PORT, () => {
		console.log(`servidor escuchando en el puerto ${PORT}`)
	})
} catch (error) {
	console.log(`error en el puerto ${PORT}`);
}

