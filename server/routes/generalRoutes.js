import express from "express";
import {
  welcomeMessage,
  getCollection,
} from "../controllers/generalController.js";

const router = express.Router();

router.get("/", welcomeMessage);
router.get("/:collection", getCollection);

export default router;
