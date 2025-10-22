
import jwt from "jsonwebtoken";
import User from "../modals/modul.user.js";

export const protecte = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");

      return next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: "Not Authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not Authorized, no token provided" });
  }
};
