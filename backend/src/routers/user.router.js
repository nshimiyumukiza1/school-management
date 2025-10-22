import express from "express";
import { loginUser, registerUser } from "../controllers/user.controller.js";
import { protecte } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register",registerUser);
router.post("/login",loginUser)

router.get("/me",protecte,(req,res) =>{
    res.json({
        message:"Wellcom to your Profifle",
        user:req.user
    })
})

export default router;