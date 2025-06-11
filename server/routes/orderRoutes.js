import express from "express";
import { placeOrder } from "../controllers/orderController.js";
import authenticateUser from "../middleware/authenticationMiddleware.js";
import authorizeUser from "../middleware/authorizationMiddleware.js";

const router = express.Router();

router.post("/", authenticateUser, authorizeUser("user"), placeOrder);

export default router;
