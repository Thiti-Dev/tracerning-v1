import express from 'express';
const router = express.Router();

import { createBlog } from '../controllers/blogs';

import {protect} from '../middleware/authorization'

router.route('/').post(protect,createBlog)

export default router;
