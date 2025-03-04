import express from 'express';
import productControl from '../controllers/product.controllers.js';
import upload from '../middlewares/multer.config.js';
const router = express.Router();

router.route('/').get(productControl.getProduct);
router.route('/create').post(upload.single('images'), productControl.createProduct);
router.route('/update/:id').put(upload.single('images'), productControl.updateProduct);
router.route('/delete/:id').delete(productControl.deleteProduct);


export default router; 