import express from "express";
import { addEntry } from "../controllers/generalController.js";
import { Ingredient } from "../models/ingredientModel.js";
import authenticateUser from "../middleware/authenticationMiddleware.js";
import authorizeUser from "../middleware/authorizationMiddleware.js";

const router = express.Router();

router.post(
  "/",
  authenticateUser,
  authorizeUser("admin"),
  addEntry(Ingredient)
);

export default router;
