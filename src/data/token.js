import jwt from "jsonwebtoken";
import { configDotenv } from 'dotenv';
configDotenv();

const secret_key = process.env.JWT_SECRET_KEY || "9e4b7f2a8d5c1e6b3f9a7d4c2e8b5f1a6d3c9b7e4f2a8d5c1e6b3f9a7d4c2e8";
console.log(secret_key);

export const generateToken = (userData) => {
    const user = {id: userData.id, email: userData.email}
    const expiration = { expiresIn: '1h' };
    return jwt.sign(user, secret_key, expiration);
}
