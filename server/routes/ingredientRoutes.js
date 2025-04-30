import express from "express";
import { Ingredient } from "../models/ingredientModel.js";
import { addEntry } from "../controllers/generalController.js";
import authenticateUser from "../middleware/authenticationMiddleware.js";
import authorizeUser from "../middleware/authorizationMiddleware.js";
import duplicationCheckingMiddleware from "../middleware/duplicationCheckingMiddleware.js";

const router = express.Router();

router.post(
  "/",
  authenticateUser,
  authorizeUser("admin"),
  duplicationCheckingMiddleware(["name"], Ingredient),
  addEntry(Ingredient)
);

export default router;
