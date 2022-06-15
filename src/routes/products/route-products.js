import { Router } from 'express'
const router = Router();
import product from "../../Api-class/controllers/products.js";

import multer from "multer";

// Multer - subir archivos
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "public/files");
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});
router.use(multer({ storage }).single("thumbnail")); // 'thumbnail' es el nombre del campo en el formulario.

//middlewares
const existProduct = async function (req, res, next) {
	//controla si existe el producto por su id
	const allProducts = await product.getAll();
	for (const el of allProducts) {
		if (el.id === Number(req.params.id)) {
			return next();
		}
	}
	//si no existe
	next("error");
};

const noProductError = async function (err, req, res, next) {
	//mensaje de error al no existir producto
	if (err) {
		return res
			.status(500)
			.json({ error: ` producto con el id ${req.params.id} no encontrado` });
	}
	next();
};

const isAdmin = true

function adminOrClient(req, res, next) {
	if (!isAdmin) {
		res.json({ error: -1, descripcion: `ruta '${req.originalUrl}' metodo '${req.method}' no autorizada ` })
	} else {
		next()
	}
}



//pagina index
router.get("/:id?", async (req, res) => {
	try {
		const { id } = req.params
		if (id === undefined) {
			let allProducts = await product.getAll();
			return res.json({ allProducts });
		}
		let idProduct = await product.getById(id)
		return res.json({ idProduct });
		// return res.render("index", { allProducts });
	} catch (error) {
		console.log(error);
	}
});


//agrega producto
router.post("/", adminOrClient, async (req, res) => {
	try {
		const productNew = req.body;
		const addProduct = await product.insertProduct(productNew);
		return res.json({ agregado: addProduct })
	} catch (error) {
		console.log(error);
	}
});

//devuelve todos los productos
// router.get("/list", async (req, res) => {
// 	try {
// 		let allProducts = await products.getAll();
// 		return res.render("list", { allProducts });
// 	} catch (error) {
// 		console.log(error);
// 	}
// });

//devuelve producto por ID
// router.get("/:id", existProduct, noProductError, async (req, res) => {
// 	try {
// 		const { id } = req.params;
// 		let productId = await products.getById(id);
// 		return res.json({ Producto: productId });
// 	} catch (error) {
// 		console.log(error);
// 	}
// });

//actualiza producto(reemplaza)
router.put("/:id", adminOrClient, existProduct, noProductError, async (req, res) => {
	try {
		const { id } = req.params;
		const newProduct = req.body;
		let productUpload = await product.update(newProduct, id);
		res.json({ Agregado: productUpload });
	} catch (error) {
		console.log(error);
	}
});

//elimina producto
router.delete("/:id", adminOrClient, existProduct, noProductError, async (req, res) => {
	try {
		const { id } = req.params;
		let productDelete = await product.deleteById(Number(id));
		return res.json({ Eliminado: productDelete });
	} catch (error) {
		console.log(error);
	}
});



export default router;
