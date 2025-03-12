import CONFIG from "./config/config.js";
import express from "express";
import cors from "cors";
import { connectDB, closeDB } from "./config/db.js";
import rootRoutes from "./routes/rootRoutes.js";
import generalRoutes from "./routes/generalRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

//* False path (add /api to URL)
app.use("/", rootRoutes);

app.use("/api", generalRoutes);


app.use(errorHandler);

const server = app.listen(CONFIG.SERVER_PORT, () => {
  console.log(
    `Server running on URI http://${CONFIG.HOST}:${CONFIG.SERVER_PORT}/api`
  );
});

const shutdown = async () => {
  await closeDB();
  server.close(() => process.exit(0));
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

export { app, server };
