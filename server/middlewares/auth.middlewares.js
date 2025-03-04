import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({})

const auth = (req,res,next)=>{
    try {
        const token = req.header('Authorization');
        // console.log(token);
        if(!token) return res.status(400).json({msg:"Invalid Authentication"});

        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
            if(err) return res.status(400).json({msg:"Invalid Authentication"});
            req.user = decoded;
            next();
        })
    } catch (error) {
        res.status(400).json({msg:error.message});
    }
}
export default auth;