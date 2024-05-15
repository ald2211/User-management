import jwt from 'jsonwebtoken'
import { errorHandler } from './Error.js';
export const verifyToken=(req,res,next)=>{
    const Token = req.cookies.access_token;
    console.log('token:',Token)
    if(!Token) return next(errorHandler(401,'unauthorized'))
    
    jwt.verify(Token,process.env.JWT_SECRET,(err,user)=>{

        if(err) return next(errorHandler(403,'forbidden'))

            req.user=user;
            next()
    })
        
}