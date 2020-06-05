import { Request, Response, NextFunction } from "express"
import ErrorResponse from "../utils/errorResponse";
interface ErrorResponseExtended extends ErrorResponse{
	code?: number;
	message: string|any;
	errors?: any;
	errCode?: number;
}

const errorHandler = (err:ErrorResponseExtended,req:Request,res:Response,next:NextFunction) => {
	let error = { ...err };

	error.message = err.message;
	error.errCode = 0

	console.log(err)

	// Mongoose duplicate key
	if (err.code === 11000) {
		const message = 'Duplicate field value entered';
		error = new ErrorResponse(message, 400);
		error.errCode = 1
	}
	
	// Mongoose validation error
	if (err.name === 'ValidationError') {
		// Long ass string => old ways
		//const message = Object.values(err.errors).map((val) => val.message);
		//error = new ErrorResponse(errors, 400);
		const errors : {
			[key:string]: string;
		} = {};
		Object.values<{
			[key:string]: string;
		}>(err.errors).forEach((val) => (errors[val.path] = val.message));
		error.message = errors; // new assigned way
		error.statusCode = 400;
		error.errCode = 2
	}

    res.status(error.statusCode || 500).json({
		success: false,
		errors: error.message || 'Server Error',
		code: error.errCode
	});
}

export default errorHandler