import Product from '../models/product.models.js';

class APIFeatures{
    constructor(query,queryString){
        this.query = query;
        this.queryString = queryString;
    }

    // filtering the product
    filtering(){
        const queryObj = {...this.queryString}
        const excludedFields = ['page','sort','limit'];
        excludedFields.forEach(el=>delete(queryObj[el]));
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g,match=>'$' + match);
        this.query.find(JSON.parse(queryStr));
        return this;
    }
    // sorting the product
    sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join('');
            this.query = this.query.sort(sortBy);
            // console.log(sortBy);
        }else{
            this.query = this.query.sort('-createdAt')
        }
        return this;
    }

    // pagination for client side
    pagination(){
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 5;
        const skip = (page-1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}

const productControl = {
    getProduct: async (req,res)=>{
        try {
            // console.log(req.query);
            const features = new APIFeatures(Product.find(),req.query).filtering().sorting().pagination()
            const products = await features.query;
            // if (!products) return res.status(400).json({msg:"Products not found"})  
            res.json({result:products.length});
        } catch (error) {
            res.status(500).json({msg:error.message})
        }
    },
    createProduct: async (req,res)=>{
        try {
            const {product_id,title,price,description,content,category} = req.body;
            // console.log(req.body);
            
            if(!req.file) return res.status(400).json({msg:"No Image Upload"});

            const product = await Product.findOne({product_id});
            if (product) return res.status(400).json({msg:"product already exist"})

            const newProduct = await Product.create({
                product_id,
                title,
                price, 
                description, 
                content,
                images: {
                    url: req.file.path, // Image URL from Cloudinary
                    public_id: req.file.filename // Public ID from Cloudinary
                },
                category
            })
            res.json({msg:"new product created.",product:newProduct});
        } catch (error) {
            res.status(500).json({msg:error.message})
        }
    },
    updateProduct: async (req,res)=>{
        try {
            const {id} = req.params;
            const {product_id,title,price,description,content,category} = req.body;

            // find the product by id
            const product = await Product.findById(id);
            if (!product) return res.status(400).json({msg:"product not found"});

            if (req.file) {
                // Delete the old image from Cloudinary
                if (product.images.public_id) {
                    await cloudinary.uploader.destroy(product.images.public_id);
                }
    
                // Update the image with new Cloudinary details
                product.images = {
                    url: req.file.path,       // New image URL
                    public_id: req.file.filename // New public ID
                };
            }

             // Update other product fields if provided in the request body
            if (title) product.title = title.toLowerCase(); // Ensure title is stored in lowercase
            if (price) product.price = price;
            if (description) product.description = description;
            if (content) product.content = content;
            if (category) product.category = category;

            // Save the updated product
            await product.save();
            res.json({ msg: "Product updated successfully", product });

        } catch (error) {
            res.status(500).json({msg:error.message})
        }
    },
    deleteProduct: async (req,res)=>{
        try {
            const product = await Product.findById(req.params.id);
        
            // Check if the product exists
            if (!product) {
                return res.status(404).json({ msg: "Product not found" });
            }
    
            // Delete the image from Cloudinary
            const publicId = product.images.public_id;
            if (publicId) {
                await cloudinary.uploader.destroy(publicId);
            }
    
            // Delete the product from the database
            await Product.findByIdAndDelete(req.params.id);
            res.json({ msg: "Product deleted successfully" });
    
        } catch (error) {
            res.status(500).json({msg:error.message})
        }
    }
}

export default productControl;