import express  from 'express';
import CategoryControl from '../controllers/category.controllers.js';
import auth from '../middlewares/auth.middlewares.js';
import adminAuth from '../middlewares/adminAuth.middlewares.js';


const router = express.Router();

router.route('/').get(CategoryControl.getCategory);
router.route('/create').post(auth,adminAuth,CategoryControl.createCategory);
router.route('/delete/:id').delete(auth,adminAuth,CategoryControl.deleteCategory);
router.route('/update/:id').put(auth,adminAuth,CategoryControl.updateCategory);



export default router;