import dotenv from "dotenv";

dotenv.config();

const CONFIG = {
    SERVER_PORT: parseInt(process.env.SERVER_PORT) || 5000,
    HOST: process.env.HOST || "localhost",
    DB_URI: process.env.DB_URI || "mongodb://127.0.0.1:27017/meat_your_maker_db",
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRATION: process.env.JWT_EXPIRATION || "1h"
}

export default CONFIG;