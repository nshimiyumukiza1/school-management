import express from "express";
import {
  createStudent,
  deleteStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
} from "../controllers/student.controller.js";
import { protecte } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protecte, createStudent);
router.get("/", protecte, getAllStudents);
router.get("/:id", protecte, getStudentById);
router.put("/:id", protecte, updateStudent);
router.delete("/:id", protecte, deleteStudent);

export default router;
