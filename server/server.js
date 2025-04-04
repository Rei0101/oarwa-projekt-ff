import CONFIG from "./config/config.js";
import express from "express";
import cors from "cors";
import { connectDB, closeDB } from "./config/db.js";
import rootRoutes from "./routes/rootRoutes.js";
import generalRoutes from "./routes/generalRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import menuItemRoutes from "./routes/menuItemRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import ingredientRoutes from "./routes/ingredientRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/", rootRoutes);
app.use("/api", generalRoutes);
app.use("/api/users", userRoutes);
app.use("/api/menu-items", menuItemRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/ingredients", ingredientRoutes);

app.use(errorHandler);

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1); 
});
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1); 
});

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
