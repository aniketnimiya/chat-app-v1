import jwt from "jsonwebtoken";



import User from "../models/user.model.js";



export const protectRoute=async(req,res,next)=>{
    try{
        const token=req.cookies?.jwt;

        if(!token)
        {
            return res.status(401).json({
                message: "UNAUTHORIZED - NO TOKEN PROVIDED"
            });
        }

        const decoded=jwt.verify(token , process.env.JWT_SECRET);

        if(!decoded)
        {
            return res.status(401).json({
                message: "UNAUTHORIZED - INVALID TOKEN"
            });
        }

        const user=await User.findById(decoded.userId).select("-password");

        if(!user)
        {
            return res.status(401).json({
                message: "UNAUTHORIZED - USER NOT FOUND"
            });
        }

        req.user = user;

        next();

    }catch(error){
        console.log("ERROR IN PROTECTROUTE MIDDLEWARE : ", error.message);
        res.status(500).json({
            message: "INTERNAL SERVER ERROR"
        });

    }

}