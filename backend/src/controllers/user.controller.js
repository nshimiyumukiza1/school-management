import User from "../modals/modul.user.js";
import { genereteToken } from "../utils/genereteToken.js";

const registerUser = async (req ,res) =>{
    try {
        const {name,email,password,role} = req.body;
        if(!name | !email |!password){
            return res.status(400).json({message:"All Failds Are Required!"})
        }

        const userExit = await User.findOne({email});
        if(userExit){
            return res.status(400).json({message:"user already exit."})
        }

        const user = await User.create({name,email,password,role})
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            password:user.password,
            role:user.role,
            token:genereteToken(user._id),


        })
        
    } catch (error) {
        res.status(500).json({error:error.message})
        
    }

}

const loginUser = async (req,res) => {
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(user &&( await user.matchPassword(password))){
            res.json({
                _id:user._id,
                name:user.name,
                email:user.email,
                token:genereteToken(user._id)
            })
        }
        
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

export {registerUser,loginUser}