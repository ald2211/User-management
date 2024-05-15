import express from 'express';
import { signin, signup,signout } from '../Controllers/auth.controller.js';
const router=express.Router();

router.post('/signup',signup)
router.post('/signin',signin)
router.get('/signout',signout)

export default router