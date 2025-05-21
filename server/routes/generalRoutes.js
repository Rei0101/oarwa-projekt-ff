import express from "express";
import {
  welcomeMessage,
  getDocuments
} from "../controllers/generalController.js";

const router = express.Router();

router.get("/", welcomeMessage);
router.get("/:collection/:id?", getDocuments);

export default router;
