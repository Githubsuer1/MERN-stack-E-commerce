import express from 'express';
import UserControl from '../controllers/user.controllers.js'
import auth from '../middlewares/auth.middlewares.js';

const router = express.Router();

router.route('/').get(UserControl.handleGetRequest);
router.route('/login').post(UserControl.login);
router.route('/logout').get(UserControl.logout);
router.route('/register').post(UserControl.register);
router.route('/refreshtoken').post(UserControl.refreshToken);
router.route('/profile').get(auth, UserControl.getUser);

export default router;