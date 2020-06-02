import express from 'express';
const router = express.Router();

import { createBlog,getBlogOfUser,getBlogDataOfUser,deleteBlog,editBlog,getAllBlogs,getSpecificBlogData } from '../controllers/blogs';

import {protect} from '../middleware/authorization'

router.route('/').post(protect,createBlog).get(getAllBlogs)
router.route('/:blogId').delete(protect,deleteBlog).patch(protect,editBlog).get(getSpecificBlogData)
router.route('/:username').get(getBlogOfUser)
router.route('/:username/:slug').get(getBlogDataOfUser)

export default router;
