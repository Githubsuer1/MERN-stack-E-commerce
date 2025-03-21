import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true, 
    },
    email:{
        type:String,
        required:true,
        unique:true, 
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:Number,
        default:0,
    },
    cart:{
        type:Array,
        default:[],
    },

},
{
    timestamps:true
})


const User = mongoose.model('Users',userSchema);
export default User;