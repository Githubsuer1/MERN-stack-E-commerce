import Category from '../models/category.models.js'
const CategoryControl = {
    getCategory: async (req,res)=>{
        try {
            const categories = await Category.find();
            res.send(categories);
        } catch (error) {
            res.status(500).json({msg:error.message})
        }
    },
    createCategory: async (req,res)=>{
        try {
            const {name} = req.body;

            const category = await Category.findOne({name});
            if(category) return res.status(400).json({msg:"Category already exists!"});

            const newCategory = await Category.create({name});
            res.json({msg:"Category created successfuly"})
        } catch (error) {
            res.status(500).json({msg:error.message});
        }
    },
    deleteCategory: async (req,res)=>{
        try {
            await Category.findByIdAndDelete(req.params.id);
            res.json({msg:"Deleted successfuly"})
        } catch (error) {
           res.status(500).json({msg:error.message}) 
        }
    },
    updateCategory: async (req,res)=>{
        try {
            const {name} = req.body;
            await Category.findByIdAndUpdate({_id:req.params.id},{name});
            res.json({msg:"Updated successfully"});
        } catch (error) {
           return res.status(500).json({msg:error.message}) 
        }
    }

}

export default CategoryControl;