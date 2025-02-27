import dotenv from "dotenv";

dotenv.config();

const CONFIG = {
    SERVER_PORT: parseInt(process.env.SERVER_PORT) || 5000,
}

export default CONFIG;