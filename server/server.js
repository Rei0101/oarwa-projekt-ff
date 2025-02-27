import CONFIG from "./config/config.js";
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// Define a route for the root path
//TODO define generalRoutes.js or something like that
app.get('/', (req, res) => {
    res.send("message");
});

//TODO Add /api base route
const server = app.listen(CONFIG.SERVER_PORT, () => {
  console.log(`Server running on port http://localhost:${CONFIG.SERVER_PORT}`);
});

export { app, server };
