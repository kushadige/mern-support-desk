import express from 'express';
import userController from '../controllers/user.controller.js';
import protect from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/me', protect, userController.getMe);

export default router;