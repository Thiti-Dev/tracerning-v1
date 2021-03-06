import { NextFunction, Request, Response } from 'express';

//@Handler
import asyncWrap from '../middleware/asynchronizeHandler'
import ErrorResponse from '../utils/errorResponse'

//@Importing database
import User from '../db/models/User'
import Blog from '../db/models/Blog';

//@Utils import
import objectKeyFilter from '../utils/objectKeyFilter'

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

export const getAllBlogs = asyncWrap(async function(req,res,next){

    //
    // ─── PAGINATION ─────────────────────────────────────────────────────────────────
    //
    const pageSize = +req.query.pagesize!;
    const currentPage = +req.query.page!;
    const blogQuery = Blog.find();
    if(pageSize && currentPage){
        blogQuery.skip(pageSize * (currentPage - 1)).limit(pageSize)
    }
    // ────────────────────────────────────────────────────────────────────────────────

    //Counting total post
    const totalBlogs = await Blog.count({})


    const blogs = await blogQuery.sort('-createdAt').populate({path:'user',select:'email username photo'})
    return res.status(200).json({ success: true, data: blogs,total:totalBlogs });
})

export const getSpecificBlogData = asyncWrap(async function(req,res,next){
    const {blogId} = req.params
    const target_blog_data = await Blog.findById(blogId)
    if(!target_blog_data){
        return next(new ErrorResponse(`Blog_id:${blogId} isn't exist in the database`,404))
    }
    return res.status(200).json({ success: true, data: target_blog_data });
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


export const getBlogDataOfUser = asyncWrap(async function(req,res,next){
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
    const target_blog_data = await Blog.findById(blogId)
    if(!target_blog_data){
        return next(new ErrorResponse(`Blog_id:${blogId} isn't exist in the database`,404))
    }
    if(target_blog_data.user.toString() !== req.user?._id.toString()){
        return next(new ErrorResponse(`You have no right to do this action`,401))
    }
    const remove_res = await Blog.findByIdAndRemove(blogId)
    return res.status(200).json({ success: true, data: null });
})

export const editBlog = asyncWrap(async function(req,res,next){
    const {blogId} = req.params
    const target_blog_data = await Blog.findById(blogId)
    if(!target_blog_data){
        return next(new ErrorResponse(`Blog_id:${blogId} isn't exist in the database`,404))
    }
    if(target_blog_data.user.toString() !== req.user?._id.toString()){
        return next(new ErrorResponse(`You have no right to do this action`,401))
    }
    const update_res = await Blog.findOneAndUpdate({_id:blogId},objectKeyFilter(req.body,['title','content']),{new:true,runValidators:true}) // 've been avoid using findByIdAndUpdate because it's not gonna trigger the hook of the mongoose
    return res.status(200).json({ success: true, data: update_res });
})


