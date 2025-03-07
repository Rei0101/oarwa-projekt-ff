import CONFIG from "./config/config.js";
import express from "express";
import cors from "cors";
import rootRoutes from "./routes/rootRoutes.js"
import generalRoutes from "./routes/generalRoutes.js"

const app = express();

app.use(cors());
app.use(express.json());

// False path (add /api to URL)
app.use("/", rootRoutes);

app.use("/api", generalRoutes);

//TODO Add /api base route
const server = app.listen(CONFIG.SERVER_PORT, () => {
  console.log(`Server running on URL http://${CONFIG.HOST}:${CONFIG.SERVER_PORT}`);
});

export { app, server };
