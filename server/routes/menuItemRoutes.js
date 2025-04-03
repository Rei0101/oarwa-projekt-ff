import express from "express";
import { addMenuItem } from "../controllers/menuItemController.js";
import authenticateUser from "../middleware/authenticationMiddleware.js";
import authorizeUser from "../middleware/authorizationMiddleware.js";

const router = express.Router();

router.post("/", authenticateUser, authorizeUser("admin"), addMenuItem)

export default router;
