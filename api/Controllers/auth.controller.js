import User from '../Models/user.model.js'
import bcrypt from 'bcrypt';
import { errorHandler } from '../utils/Error.js';
import jwt from 'jsonwebtoken';

//signup
export const signup=async(req,res,next)=>{
    try{
        const {username,email,number,password}=req.body
    const hashedPassword=bcrypt.hashSync(password,10);
    const newUser= new User({username,email,number,password:hashedPassword})
    await newUser.save()

    res.status(201).json({ message: 'User created successfully' });
    }catch(error){
        next(error)
    }
}

//sign in
export const signin=async(req,res,next)=>{
    try{
        console.log('reached:',req.body)

        const {email,password}=req.body
    const hashedPassword=bcrypt.hashSync(password,10);
    const validUser= await User.findOne({email});
    if(!validUser){
        return next(errorHandler(404,'user not found'))
    }
    const validPassword=bcrypt.compareSync(password,validUser.password)
    if(!validPassword){
        return next(errorHandler(401,'wrong credentials!'))
    }
    const token=jwt.sign({id:validUser._id},process.env.JWT_SECRET)

    const {password:pass,...rest}=validUser._doc
    res.cookie('access_token',token).status(200).json(rest)

    }catch(error){
        next(error)
    }
}