import express from "express";
import { welcomeMessage } from "../controllers/generalController.js";

const router = express.Router();

router.get("/", welcomeMessage);

export default router;
