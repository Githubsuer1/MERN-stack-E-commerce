import mongoose from 'mongoose';

const product  = new mongoose.Schema({
    product_id:{
        type:String,
        unique:true,
        required:true,
        trim:true, 
    },
    title:{
        type:String,
        trim:true,
        required:true,
    },
    price:{
        type:Number,
        trim:true,
        required:true,
    },
    description:{
        type:String,
        required:true,
        trim:true,
    },
    content:{
        type:String,
        required:true,
    },
    images:{
        url: { 
            type: String, 
            required: true 
        },
        public_id: { 
            type: String, 
            required: true 
        }
    },
    category:{
        type:String,
        required:true,
    },
    checked:{
        type:Boolean,
    },
    sold:{
        type:Number,
        default:0
    },
},
{
    timestamps:true
});


const Product = mongoose.model("Product",product);
export default Product;