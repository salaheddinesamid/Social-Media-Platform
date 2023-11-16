import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/Users.js";
/** REGISTER USER    */
export const Register = async(req,res)=>{
    try{
        const{
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location
        }= req.body; 
        const salt = await bcrypt.genSalt();
        const passHash = await bcrypt.hash(password,salt);
        const newUser = new User({
            firstName,
            lastName,
            email,
            password : passHash,
            picturePath,
            friends,
            location
        })
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    }catch(err){
        res.status(500).json({error: err.message});
    }
};
/** LOGIN */
const login = async(req,res)=>{
    try{
        const{
            email,
            password
        } = req.body;
        const user = await User.findOne({email:email});
        const isValid = await bcrypt.compare(password, user.password);
        const token = jwt.sign({id:user.id}, process.env.JWT_SECRET);
        delete user.password;
        if(!user){
            return res.status(400).json({message: "User does not exist"});
        }
    }catch(err){
        res.status(500).json({error: err.message});
    }
}