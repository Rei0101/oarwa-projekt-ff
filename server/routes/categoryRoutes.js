import express from "express";
import { Category } from "../models/categoryModel.js";
import { addEntry, deleteEntry } from "../controllers/generalController.js";
import authenticateUser from "../middleware/authenticationMiddleware.js";
import authorizeUser from "../middleware/authorizationMiddleware.js";
import duplicationCheckingMiddleware from "../middleware/duplicationCheckingMiddleware.js";

const router = express.Router();

router.post(
  "/",
  authenticateUser,
  authorizeUser("admin"),
  duplicationCheckingMiddleware(["name"], Category),
  addEntry(Category)
);
router.delete(
  "/:id",
  authenticateUser,
  authorizeUser("admin"),
  deleteEntry(Category)
);

export default router;
