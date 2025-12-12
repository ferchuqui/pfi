import express from "express";

import {
    addProduct,
    deleteProduct,
    getAllProducts,
    getProductById
} from "../controllers/product.controllers.js";

const routes = express.Router();

routes.get("/products", getAllProducts)
routes.get("/products/:id", getProductById)
routes.post("/products/create", addProduct);
routes.delete("/products/:id", deleteProduct)



export default routes;