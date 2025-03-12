import express from "express";
import { newUser } from "../controllers/userController.js";

const router = express.Router();
router.post("/", newUser);

export default router;
