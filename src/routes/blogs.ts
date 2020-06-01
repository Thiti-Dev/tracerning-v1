import express from 'express';
const router = express.Router();

import { createBlog,getBlogOfUser,getBlogData } from '../controllers/blogs';

import {protect} from '../middleware/authorization'

router.route('/').post(protect,createBlog)
router.route('/:username').get(getBlogOfUser)
router.route('/:username/:slug').get(getBlogData)

export default router;
