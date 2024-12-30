import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
 
  const { fullName, email, password } = req.body;
  try{
    if(!fullName || !email || !password){
        res.status(400).json({
          message : "You have to fill all the fields"
        })
    }
    if(password.length<6){
     return res.status(400).json({message:"Password must be atleast 6 character"});
    }
    const user =await User.findOne({email});
    if(user){
      return res.status(400).json({message:"user already exist"});
    }
    const salt = await bcrypt.genSalt(10);

    const hashedPassword= await bcrypt.hash(password,salt);

    const newUser= new User({
      fullName,
      email,
      password:hashedPassword,
    }
  )
  if(newUser){
    generateToken(newUser._id,res)
    await newUser.save();

    res.status(201).json({
      _id:newUser._id,
      fullName:newUser.fullName,
      email:newUser.email,
      password:newUser.password,
      profilePic:newUser.profilePic,
    })
  }
  }
  catch(err){
    console.log("error in signup ", err.message);
    res.status(500).json({message:"internal server Error"});

  }
};

export const login = async (req, res) => {
  // res.send("login route");
  const { email, password } =req.body;
  try{
    const user=await User.findOne({email});
    if(user){
    const isCorrectPassword = await bcrypt.compare(password,user.password)
    if(isCorrectPassword){
        generateToken(user._id,res);

         res.status(201).json({
           _id: user._id,
           fullName: user.fullName,
           email: user.email,
           password: user.password,
           profilePic: user.profilePic,
         });
    }
    else{
      return res.status(400).json({message : "Inavalid credentials"});
    }
  }
  else{
    return res.status(400).json({ message: "Inavalid credentials" });
  }

  }
  catch(err){
   console.log("error in login controller ",err.message);
   res.status(400).json({message: "Internal server error"});
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwttoken", "", { maxAge: 0 });
    res.status(200).json({ message: "logged out successfully" });
  } catch (err) {
    console.log("error in logoutntroller ", err.message);
    res.status(400).json({ message: "Internal server error" });
  }
};

export const updateProfile = async (req,res)=>{
  try {
    const {profilePic}=req.body;
    const userId=req.user._id;

    if(!profilePic){
      return res.status(400).json({message:"profile pic is required"});
    }
    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findOneAndUpdate(userId,{profilePic:uploadResponse.secure_url},{new:true});

    res.status(200).json(updatedUser);
  
  } catch (error) {
    console.log("error in uploading image ",error.message);
    res.status(500).json({error:"Internal server error"});
  }
}

export const checkAuth = (req,res)=>{
  try {
    res.status(200).send(req.user);
  } catch (error) {
    console.log("error in checkAuth controller ",error.message);
    res.status(500).json({error:"internal server error"});
  }
}