import { Request, Response, NextFunction } from "express"

interface ErrorResponse extends Error{
    statusCode?: number
}

const errorHandler = (err:ErrorResponse,req:Request,res:Response,next:NextFunction) => {
	let error = { ...err };

	error.message = err.message;

    console.log(err)

    res.status(error.statusCode || 500).json({
		success: false,
		errors: error.message || 'Server Error'
	});
}

export default errorHandler