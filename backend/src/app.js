import express from "express"
import dotenv from "dotenv"
import { connectionDB } from "./dbconfig/db.js";


const app = express()

dotenv.config();
const port = process.env.PORT || 3000;
connectionDB()


app.listen(port,() => console.log(`port is running on ${port}`))