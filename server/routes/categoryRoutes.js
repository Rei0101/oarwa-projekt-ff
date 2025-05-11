import express from "express";
import { Category } from "../models/categoryModel.js";
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
  lowerCaseNameMiddleware,
  duplicationCheckingMiddleware(["name"], Category),
  addEntry(Category)
);
router.put(
  "/:id",
  authenticateUser,
  authorizeUser("admin"),
  lowerCaseNameMiddleware,
  duplicationCheckingMiddleware(["name"], Category),
  putFieldCheckingMiddleware(["name", "type"]),
  fullyUpdateEntry(Category)
);
router.patch(
  "/:id",
  authenticateUser,
  authorizeUser("admin"),
  lowerCaseNameMiddleware,
  duplicationCheckingMiddleware(["name"], Category),
  partiallyUpdateEntry(Category)
);
router.delete(
  "/:id",
  authenticateUser,
  authorizeUser("admin"),
  deleteEntry(Category)
);

export default router;
