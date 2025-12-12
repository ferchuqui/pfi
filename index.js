import express from "express";

import cors from "cors";

import { configDotenv } from "dotenv";
configDotenv();

import rutasLog from "./src/routes/auth.routes.js";

import rutasProductos from "./src/routes/product.routes.js";


const app = express();

const PORT = process.env.PORT || 3000;

const corsConfig = {
    origin: ['http://localhost:3000', 'https://midominio.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    maxAge: 600,
    optionsSuccessStatus: 204
}

app.use(cors(corsConfig));

app.use(express.json());

app.use("/api", rutasLog);

app.use((req, res, next) => {
    console.log(`Datos recibidos: ${req.method}`);
    next();
})

app.use("/api", rutasProductos);

app.use((req, res, next) => {
    res.status(404).send("Ruta no encontrada");
})

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})

