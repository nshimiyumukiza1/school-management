import express from "express"
import { protecte } from "../middleware/authMiddleware.js"
import { createTeacher, deleteTeacher, getAllTeachers, updateTeacher } from "../controllers/teacher.controller.js"

const router = express.Router()
router.post("/",protecte,createTeacher)
router.get("/",protecte,getAllTeachers)
router.put("/:id",protecte,updateTeacher)
router.delete("/:id",protecte,deleteTeacher)

export default router