import express from 'express';
const router = express.Router();

import { registerUser } from '../controllers/authorization';

router.route('/').post(registerUser);

export default router;
