import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute= async (req,res,next) =>{
    try{
        const token = req.cookies.jwttoken;
        // Problem
        if(!token){
           return res.status(400).json({message: "unauthorized access"});
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        if(!decoded){
            return res.status(400).json({message: "Invalid token"});
        }
        const user= await User.findById(decoded.userId).select("-password");

        if(!user){
            return res.status(404).json({message:"user not found"});
        }
        req.user=user;
        next();
    }
    catch(err){
        console.log("error in protect route middleware: ",err);
        res.status(404).json({message:"internal server error"});
    }
}