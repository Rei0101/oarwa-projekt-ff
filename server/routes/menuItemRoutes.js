import express from "express";
import { MenuItem } from "../models/menuItemModel.js";
import {
  addEntry,
  fullyUpdateEntry,
  partiallyUpdateEntry,
  deleteEntry,
} from "../controllers/generalController.js";
import authenticateUser from "../middleware/authenticationMiddleware.js";
import authorizeUser from "../middleware/authorizationMiddleware.js";
import duplicationCheckingMiddleware from "../middleware/duplicationCheckingMiddleware.js";
import putFieldCheckingMiddleware from "../middleware/putFieldCheckingMiddleware.js";

const router = express.Router();

router.post(
  "/",
  authenticateUser,
  authorizeUser("admin"),
  duplicationCheckingMiddleware(["name"], MenuItem),
  addEntry(MenuItem)
);
router.put(
  "/:id",
  authenticateUser,
  authorizeUser("admin"),
  duplicationCheckingMiddleware(["name"], MenuItem),
  putFieldCheckingMiddleware([
    "imageLink",
    "name",
    "categories",
    "ingredients",
    "price",
  ]),
  fullyUpdateEntry(MenuItem)
);
router.patch(
  "/:id",
  authenticateUser,
  authorizeUser("admin"),
  duplicationCheckingMiddleware(["name"], MenuItem),
  partiallyUpdateEntry(MenuItem)
);
router.delete(
  "/:id",
  authenticateUser,
  authorizeUser("admin"),
  deleteEntry(MenuItem)
);

export default router;
