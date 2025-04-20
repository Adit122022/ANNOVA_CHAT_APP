import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
export const protect = async (req, res, next) => {
   try {
    // console.log(req.cookies.jwt)
     const token = req.cookies.jwt;
     if(!token){
        res.status(400).json({message:"UNAUTHORIZED"})
     }
     const decoded = jwt.verify(token , process.env.JWT_SECRET);
     if(!decoded){
        res.status(400).json({message:"UNAUTHORIZED or TOKEN EXPIRED"})
     }
    //   console.log(decoded.id)
     const user = await User.findById(decoded.id).select("-password");
    //  console.log(user)
     if(!user){
        res.status(400).json({message:"UNAUTHORIZED USER"})
     }
     req.user = user;
     next();
   } catch (error) {
        console.log("Auth middleware error -->", error.message);
        res.status(400).json({ message: "Unauthorized"  , error: error.message });
   }
}