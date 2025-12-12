import jwt from "jsonwebtoken";
import "dotenv/config";
const secret_key = process.env.JWT_SECRET_KEY || "9e4b7f2a8d5c1e6b3f9a7d4c2e8b5f1a6d3c9b7e4f2a8d5c1e6b3f9a7d4c2e8";

//MidleWare Authentication
export const authentication = (req, res, next) => {
 const token = req.headers.authorization.split(" ")[1];  
if (!token) return res.sendStatus(401);

jwt.verify(token, secret_key, (err) => {
    if (err) return res.sendStatus(403);
    next();
});
}