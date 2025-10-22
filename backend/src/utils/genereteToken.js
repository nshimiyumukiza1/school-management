import jwt from "jsonwebtoken";

export const genereteToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"30d"})
}