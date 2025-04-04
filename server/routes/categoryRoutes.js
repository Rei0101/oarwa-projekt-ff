import express from "express";
import { addEntry } from "../controllers/generalController.js";
import { Category } from "../models/categoryModel.js";
import authenticateUser from "../middleware/authenticationMiddleware.js";
import authorizeUser from "../middleware/authorizationMiddleware.js";

const router = express.Router();

router.post("/", authenticateUser, authorizeUser("admin"), addEntry(Category));

export default router;
