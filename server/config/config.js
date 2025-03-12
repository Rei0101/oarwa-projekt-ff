import dotenv from "dotenv";

dotenv.config();

const CONFIG = {
    SERVER_PORT: parseInt(process.env.SERVER_PORT) || 5000,
    HOST: process.env.HOST || "localhost",
    DB_URI: process.env.DB_URI || "mongodb://127.0.0.1:27017/meat_your_maker_db",
}

export default CONFIG;