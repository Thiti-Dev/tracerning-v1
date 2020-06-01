import express from 'express';
const router = express.Router();

import { createBlog,getBlogOfUser,getBlogData,deleteBlog } from '../controllers/blogs';

import {protect} from '../middleware/authorization'

router.route('/').post(protect,createBlog)
router.route('/:blogId').delete(protect,deleteBlog)
router.route('/:username').get(getBlogOfUser)
router.route('/:username/:slug').get(getBlogData)

export default router;
