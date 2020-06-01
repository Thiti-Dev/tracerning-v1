import express from 'express';
const router = express.Router();

import { registerUser,loginUser,getProfileData } from '../controllers/authorization';

import {protect} from '../middleware/authorization'

router.route('/').post(registerUser).get(protect,getProfileData);
router.route('/login').post(loginUser);

export default router;
