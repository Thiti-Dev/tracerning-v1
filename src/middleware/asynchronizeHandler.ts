import { NextFunction, Request, Response } from 'express';
const asyncWrap = (fn: (req: Request,res: Response,next: NextFunction,...arg:any[]) => Promise<any>) =>
    function asyncHandlerWrap(req: Request,res: Response,next: NextFunction,...arg:any[]){
        const fnReturn = fn(req,res,next,...arg)
        return Promise.resolve(fnReturn).catch(next)
    }

export default asyncWrap