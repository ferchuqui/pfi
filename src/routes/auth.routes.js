import express from "express";
import { login } from "../controllers/auth.controller";

const routes = express.Router();

routes.post("/login", login);

export default routes;
