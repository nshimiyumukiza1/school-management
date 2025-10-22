import express from "express"
import { createStudent, getAllStudents } from "../controllers/student.controller.js";
import { protecte } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/",protecte,createStudent)
router.get("/",protecte,getAllStudents)

export default router