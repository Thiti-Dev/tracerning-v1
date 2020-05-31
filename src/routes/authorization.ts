import express from 'express';
const router = express.Router();

import { registerUser,loginUser } from '../controllers/authorization';

router.route('/').post(registerUser);
router.route('/login').post(loginUser);

export default router;
