import express from "express";
import { addEntry } from "../controllers/generalController.js";
import { MenuItem } from "../models/menuItemModel.js";
import authenticateUser from "../middleware/authenticationMiddleware.js";
import authorizeUser from "../middleware/authorizationMiddleware.js";

const router = express.Router();

router.post("/", authenticateUser, authorizeUser("admin"), addEntry(MenuItem));

export default router;
