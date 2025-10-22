import mongoose from "mongoose";

export const connectionDB = async () =>{
    try {

       const conn = await mongoose.connect(process.env.CONNECTION_STRING)
        console.log(`Data Base connect: ${conn.connection.host}`)
        
    } catch (error) {
        process.exit(1)
        
    }
}