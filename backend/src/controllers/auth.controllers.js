import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js";



import { generateToken } from "../utils/utils.js";



export const signup=async(req,res)=>{
    const { fullName , email , password }=req.body;

    try{

        if(!fullName || !email || !password)
        {
            return res.status(400).json({
                message: "ALL FIELDS ARE REQUIRED",
            });
        }

        if(password.length<6)
        {
            return res.status(400).json({
                message: "PASSWORD MUST BE ATLEAST 6 CHARACTER LONG",
            });
        }

        const user=await User.findOne({email});
        if(user)
        {
            return res.status(400).json({
                message: "USER WITH THIS EMAIL ALREADY EXISTS",
            });
        }

        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        const newUser=new User({
            fullName,
            email,
            password: hashedPassword,
        });
        if(newUser)
        {
            generateToken(newUser._id , res);
            await newUser.save();

            return res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            })
        }
        else
        {
            res.status(400).json({
                message: "INVALID USER DATA",
            });
        }

    }catch(error){
        console.log("ERROR IN SIGNUP CONTROLLER : ", error.message);
        res.status(500).json({
            message: "INTERNAL SERVER ERROR",
        });

    }

};



export const login=async(req,res)=>{
    const {email , password}=req.body;

    try{
        const user=await User.findOne({email});

        if(!user)
        {
            return res.status(400).json({
                message: "INVALID CREDENTIALS"
            });
        }

        const isPasswordCorrect=await bcrypt.compare(password , user.password);
        
        if(!isPasswordCorrect)
        {
            return res.status(400).json({
                message: "INVALID CREDENTIALS"
            });
        }

        generateToken(user._id , res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
        })

    }catch(error){
        console.log("ERROR IN LOGIN CONTROLLER : ", error.message);
        res.status(500).json({
            message: "INTERNAL SERVER ERROR"
        });
    }

};



export const logout=async(req,res)=>{
    try{
        res.cookie("jwt" , "" , {maxAge:0});
        res.status(200).json({
            message: "LOGOUT SUCCESSFULLY"
        });

    }catch(error){
        console.log("ERROR IN LOGOUT CONTROLLER : ", error.message);

    }

};



export const updateProfile=async(req,res)=>{
    try{
        const { profilePic }=req.body;
        const userId=req.user._id;
        if(!profilePic)
        {
            return res.status(400).json({
                message: "POFILE PICTURE IS REQUIRED"
            });
        }

        const uploadResponse=await cloudinary.uploader.upload(profilePic);
        const updatedUser=await User.findByIdAndUpdate(
            userId,
            {profilePic: uploadResponse.secure_url},
            {new: true}
        )

        res.status(200).json(updatedUser);

    }catch(error){
        console.log("ERROR IN UPDATEPROFILE CONTROLLER : ", error.message);
        res.status(500).json({
            message: "INTERNAL SERVER ERROR"
        });

    }

};



export const checkAuth=async(req,res)=>{
    try{
        res.status(200).json(req.user);
    }catch(error){
        console.log("ERROR IN CHECKAUTH CONTROLLER : ", error.message);
        res.status(500).json({
            message: "INTERNAL SERVER ERROR"
        });
    }
};



export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.status(200).json(users);
    } catch (error) {
        console.log("ERROR IN GETALLUSERS CONTROLLER:", error.message);
        res.status(500).json({ message: "INTERNAL SERVER ERROR" });
    }
};