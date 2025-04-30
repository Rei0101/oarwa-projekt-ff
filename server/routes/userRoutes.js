import express from "express";
import { User } from "../models/userModel.js";
import { registerUser, loginUser } from "../controllers/userController.js";
import duplicationCheckingMiddleware from "../middleware/duplicationCheckingMiddleware.js";

const router = express.Router();
router.post(
  "/register",
  duplicationCheckingMiddleware(["email"], User),
  registerUser
);
router.post("/login", loginUser);

export default router;
