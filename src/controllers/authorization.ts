import { NextFunction, Request, Response } from 'express';

//@Handler
import asyncWrap from '../middleware/asynchronizeHandler'
import ErrorResponse from '../utils/errorResponse'

//@Importing database
import User from '../db/models/User';


//
// ─── INTERFACES ─────────────────────────────────────────────────────────────────
//
interface LoginCredentials{
	email: string,
	username: string,
	password: string
}
// ────────────────────────────────────────────────────────────────────────────────


export const registerUser = asyncWrap(async function(req: Request, res: Response, next: NextFunction) {
	const {email,username,password} : LoginCredentials = req.body

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
