import User from "../models/user.models.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config({})


const UserControl = {
    handleGetRequest:async (req,res)=>{
        res.send('Hello we are on home page');
    },
    register: async (req,res)=>{
        try {
            // 1. destructuring the data getting from request body
            const {username,email,password} = req.body;
            
            // 2. if user is alerady registered with existing email
            const user = await User.findOne({email});
            if(user) return res.status(500).json({msg:"Email is Already Registered!"});
    
            // 3. if password is less than 6 letters
            if (password.length < 6)  return res.status(500).json({msg:"Password Must Contain Atleast 6 Charactors"});
    
            // 4. hashing the password using bcrypt functionality
            const HashPassword = await bcrypt.hash(password,10)

            // 5. creating the user using odm
            const newUser = await User.create({username,email,password:HashPassword});
    
            // 6. create jwt to authenticate
            const accesstoken = createAccessToken({id:newUser._id});
            const refreshtoken = createRefreshToken({id:newUser._id});
    
            // 7. setting cookie 
            res.cookie('refreshtoken',refreshtoken,{
                httpOnly:true,
                path:'/api/v1/users/refreshtoken'
            })
            return res.json({accesstoken});
        } catch (error) {
            return res.status(500).json({msg:error.message});
        }
    },
    refreshToken: async (req,res)=>{
        try {
            // getting the refresh token from incoming request cookie, if not found ask him to login again.
            const rf_token = req.cookies.refreshtoken;
            if(!rf_token) return res.status(400).json({msg:"Please login or registers"});
    
            // verify the token 
            jwt.verify(rf_token,process.env.REFRESH_TOKEN_SECRET,(err,user)=>{
                if(err) return res.status(500).json({msg:"Please login or register"});
                const accesstoken = createAccessToken({id:user.id});
                res.json({user,accesstoken});
            })
        } catch (error) {
            res.status(500).json({msg:error.message});
        } 
    },
    login: async (req,res)=>{
        try {
            const {email,password} = req.body;
            console.log(email,password)
    
            // finding user in database by matching the email
            const findUser = await User.findOne({email});
            if(!findUser) return res.status(400).json({msg:"User does not exist!"});
    
            // comparing the given password with found user password
            const isMatch = await bcrypt.compare(password,findUser.password)
            if(!isMatch) return res.status(400).json({msg:"Incorrect Password"});
    
            // generating the accesstoken and refresh token
            const accesstoken = createAccessToken({id:findUser._id})
            const refreshtoken = createRefreshToken({id:findUser._id})
    
            // setting the cookie
            res.cookie('refreshtoken',refreshtoken,{
                httpOnly:true,
                path:'/api/v1/users/refreshtoken'
            });
            // sending back the user data with the token
            return res.json({
                accesstoken,
                user: {
                    id: findUser._id,
                    name: findUser.username,
                    email: findUser.email,
                },
            });
        } catch (error) {
            return res.status(500).json({msg:error.message})
        }
    },
    logout: async (req,res)=>{
        try {
            res.clearCookie('refreshtoken',
                {
                    path:'/api/v1/users/refreshtoken'
                }
            );
            res.json({msg:'Logout successfuly'})
        } catch (error) {
            res.json({msg:error.message});
        }
    },
    getUser: async (req,res)=>{
        try {
            const user = await User.findById(req.user.id).select('-password')
            if(!user) return res.status(400).json({msg:"User not found!"});
            res.json(user); 
        } catch (error) {
            res.status(400).json({msg:error.message});
        }
    }

}


// function to generate the access token
const createAccessToken = (payload)=>{
    return jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'1d'})
}

// create refresh token
const createRefreshToken = (payload)=>{
    return jwt.sign(payload,process.env.REFRESH_TOKEN_SECRET,{expiresIn:'7d'})
}





export default UserControl;