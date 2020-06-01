import asyncWrap from '../middleware/asynchronizeHandler'
import ErrorResponse from '../utils/errorResponse'
import User from '../db/models/User'

export const protect = asyncWrap(async function(req,res,next){
    // If session exists
    if(req.session && req.session.cached_credentials){
        const {_id} =req.session.cached_credentials
        // Check if user still exist
        const user_data = await User.findById(_id)
        if(user_data){
            req.user = req.session.cached_credentials
        }else{
            return next(new ErrorResponse(`Not authorize to access this route`,401))
        }
        next()
    }else{
        return next(new ErrorResponse(`Not authorize to access this route`,401))
    }
})