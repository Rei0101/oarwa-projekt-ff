import express from "express";
import { User } from "../models/userModel.js";
import {
  registerUser,
  loginUser,
  changePassword,
} from "../controllers/userController.js";
import authenticateUser from "../middleware/authenticationMiddleware.js";
import authorizeUser from "../middleware/authorizationMiddleware.js";
import duplicationCheckingMiddleware from "../middleware/duplicationCheckingMiddleware.js";

const router = express.Router();
router.post(
  "/register",
  duplicationCheckingMiddleware(["email"], User),
  registerUser
);
router.post("/login", loginUser);
router.patch(
  "/change-password",
  authenticateUser,
  authorizeUser("user"),
  changePassword
);

export default router;
