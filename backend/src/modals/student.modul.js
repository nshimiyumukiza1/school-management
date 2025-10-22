import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"please add a student name"]
    },
    age:{
        type:Number,
        required:[true,"please add age"]
    },
    gender:{
        type:String,
        enum:["male","female"],
        required:true
    },
    className:{
        type:String,
        required:[true,"Please add class name"]
    },
    address:{type:String},
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},{timistamps:true})

const Student = mongoose.model("Studnt",studentSchema)

export default Student