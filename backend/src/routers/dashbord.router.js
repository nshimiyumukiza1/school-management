import express from "express";
import { protecte } from "../middleware/authMiddleware.js";
import { getDashBoardStatus } from "../controllers/dashboard.controller.js";

const router = express.Router();
router.get("/", protecte, getDashBoardStatus);

export default router;
