import express from "express"
import dotenv from "dotenv"
import { connectionDB } from "./dbconfig/db.js";
import userRouter from "./routers/user.router.js";


const app = express()
app.use(express.json())
app.use("/api",userRouter)

dotenv.config();
const port = process.env.PORT || 3000;
connectionDB()


app.listen(port,() => console.log(`port is running on ${port}`))