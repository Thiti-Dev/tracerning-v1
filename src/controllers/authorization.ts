import { NextFunction, Request, Response } from 'express';

//@Handler
import asyncWrap from '../middleware/asynchronizeHandler'
import ErrorResponse from '../utils/errorResponse'

//@Importing database
import User from '../db/models/User';


//
// ─── INTERFACES ─────────────────────────────────────────────────────────────────
//
interface RegisterCredentials{
	email: string,
	username: string,
	password: string
}

interface LoginCredentials{
	email: string,
	password: string
}
// ────────────────────────────────────────────────────────────────────────────────


export const registerUser = asyncWrap(async function(req, res, next) {
	const {email,username,password} : RegisterCredentials = req.body

	//@HARDCODING VALIDATION => WILL BE REMOVED LATER

	if(!email || !username || !password){
		return next(new ErrorResponse('Invalid request body => need (email,username,password)',400))
	}

	// ────────────────────────────────────────────────────────────────────────────────


	const user_created = await User.create({
			email,
			username,
			password
	});
	res.status(200).json({ success: true, data: user_created });
})

export const loginUser = asyncWrap(async function(req, res, next) {
	const {email,password} : LoginCredentials = req.body

	//@HARDCODING VALIDATION => WILL BE REMOVED LATER

	if(!email || !password){
		return next(new ErrorResponse('Invalid request body => need (email,password)',400))
	}

	// ────────────────────────────────────────────────────────────────────────────────

	const user = await User.findOne({email}).select('+password') // included hidden field

	if(!user){
		return next(new ErrorResponse(`Invalid email or password`,401))
	}

	if(!await user.matchPassword(password)){
		return next(new ErrorResponse(`Invalid email or password`,401))
	}

	//@Cached user credentials in the session
	req.session!.cached_credentials = user

	res.status(200).json({ success: true, data: user });
})


export const getProfileData = asyncWrap(async function(req, res, next) {
	return res.status(200).json({ success: true, data: req.user });
})
