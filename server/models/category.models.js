import mongoose from "mongoose";

const category  = new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:true,
        trim:true,
    }
},
{
    timestamps:true
})

const Category = mongoose.model("Category",category);
export default Category;