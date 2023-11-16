import jwt from "jsonwebtoken";
export const verifyToken = (req,res, next)=>{
    try{
        let token = req.header("Authorization");
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    }catch(err){
        res.status(500).json({message:err.message});
    }
}