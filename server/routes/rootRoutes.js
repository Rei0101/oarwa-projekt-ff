import express from "express";
import { rootMessage } from "../controllers/rootController.js";

const router = express.Router();

router.get("/", rootMessage);

export default router;
