import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { connectionDB } from "./dbconfig/db.js";
import userRouter from "./routers/user.router.js";
import studentRouter from "./routers/student.router.js";
import teacherRouter from "./routers/teacher.router.js";
import classRouter from "./routers/class.router.js";
import dashboardRouter from "./routers/dashbord.router.js";


const app = express()
app.use(express.json())
app.use(cors())
app.use("/api/auth",userRouter)
app.use("/api/student",studentRouter)
app.use("/api/teacher",teacherRouter )
app.use("/api/class",classRouter)
app.use("/api/dashboard",dashboardRouter )
dotenv.config();
const port = process.env.PORT || 3000;
connectionDB()


app.listen(port,() => console.log(`port is running on ${port}`))