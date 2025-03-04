import User from '../models/user.models.js';

const adminAuth = async (req,res,next) =>{
    try {
        const user = await User.findOne({_id:req.user.id});
        // console.log(user.role)
        if(user.role === 0) return res.status(400).json({msg:"You are not an admin"});
        next();
    } catch (error) {
        res.status(500).json({msg:error.message});
    }   
}

export default adminAuth;