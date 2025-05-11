import express from "express";
import { Ingredient } from "../models/ingredientModel.js";
import {
  addEntry,
  fullyUpdateEntry,
  partiallyUpdateEntry,
  deleteEntry,
} from "../controllers/generalController.js";
import authenticateUser from "../middleware/authenticationMiddleware.js";
import authorizeUser from "../middleware/authorizationMiddleware.js";
import duplicationCheckingMiddleware from "../middleware/duplicationCheckingMiddleware.js";
import lowerCaseNameMiddleware from "../middleware/lowerCaseNameMiddleware.js";
import putFieldCheckingMiddleware from "../middleware/putFieldCheckingMiddleware.js";

const router = express.Router();

router.post(
  "/",
  authenticateUser,
  authorizeUser("admin"),
  duplicationCheckingMiddleware(["name"], Ingredient),
  lowerCaseNameMiddleware,
  addEntry(Ingredient)
);
router.put(
  "/:id",
  authenticateUser,
  authorizeUser("admin"),
  lowerCaseNameMiddleware,
  duplicationCheckingMiddleware(["name"], Ingredient),
  putFieldCheckingMiddleware(["imageLink", "name", "categories", "price"]),
  fullyUpdateEntry(Ingredient)
);
router.patch(
  "/:id",
  authenticateUser,
  authorizeUser("admin"),
  lowerCaseNameMiddleware,
  duplicationCheckingMiddleware(["name"], Ingredient),
  partiallyUpdateEntry(Ingredient)
);
router.delete(
  "/:id",
  authenticateUser,
  authorizeUser("admin"),
  deleteEntry(Ingredient)
);

export default router;
