import express from 'express';
const router = express.Router();

import { createBlog,getBlogOfUser } from '../controllers/blogs';

import {protect} from '../middleware/authorization'

router.route('/').post(protect,createBlog)
router.route('/:username').get(getBlogOfUser)

export default router;
