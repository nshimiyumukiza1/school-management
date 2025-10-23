import express from "express";
import {
  createClass,
  deleteClass,
  updateClass,
} from "../controllers/class.controller.js";
import { protecte } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protecte, createClass);

router.route("/:id").put(protecte, updateClass).delete(protecte, deleteClass);

export default router;
