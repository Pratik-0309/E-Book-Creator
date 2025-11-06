import express from 'express';
import { registerUser, LoginUser, getProfile, updateProfile, refreshAccessToken } from '../controller/authController.js'; 
import verifyJWT from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(LoginUser);
router.post('/refresh-token', refreshAccessToken);
router.route('/profile').get(verifyJWT, getProfile);
router.route('/update').patch(verifyJWT, updateProfile);



export default router;