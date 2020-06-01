import { NextFunction, Request, Response } from 'express';

//@Handler
import asyncWrap from '../middleware/asynchronizeHandler'
import ErrorResponse from '../utils/errorResponse'

//@Importing database
import Blog from '../db/models/Blog';

//
// ─── INTERFACES ─────────────────────────────────────────────────────────────────
//
interface BlogBody{
    title: string;
    content: string;
}
// ────────────────────────────────────────────────────────────────────────────────



export const createBlog = asyncWrap(async function(req, res, next) {
    const {title,content}:BlogBody = req.body
    const blog_created = await Blog.create({user:req.user?._id,title,content})
	return res.status(200).json({ success: true, data: blog_created });
})
