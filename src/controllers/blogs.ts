import { NextFunction, Request, Response } from 'express';

//@Handler
import asyncWrap from '../middleware/asynchronizeHandler'
import ErrorResponse from '../utils/errorResponse'

//@Importing database
import User from '../db/models/User'
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

export const getBlogOfUser = asyncWrap(async function(req,res,next){
    const {username} = req.params
    const target_user = await User.findOne({username})
    if(!target_user){
        return next(new ErrorResponse(`User:${username} isn't exist in the database`,404))
    }
    const user_blogs = await Blog.find({user:target_user._id})
    return res.status(200).json({ success: true, data: user_blogs });
})


export const getBlogData = asyncWrap(async function(req,res,next){
    const {username,slug} = req.params
    const target_user = await User.findOne({username})
    if(!target_user){
        return next(new ErrorResponse(`User:${username} isn't exist in the database`,404))
    }
    const target_blog_data = await Blog.findOne({slug,user:target_user._id})
    if(!target_blog_data){
        return next(new ErrorResponse(`Blog:${slug} of User:${username} isn't exist in the database`,404))
    }
    return res.status(200).json({ success: true, data: target_blog_data });
})


export const deleteBlog = asyncWrap(async function(req,res,next){
    const {blogId} = req.params
    const remove_res = await Blog.findByIdAndRemove(blogId)
    return res.status(200).json({ success: true, data: remove_res });
})

