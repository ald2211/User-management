import User from '../Models/user.model.js'
import bcrypt from 'bcrypt'
export const signup=async(req,res,next)=>{
    try{
        const {fullName,username,email,number,password,isAdmin}=req.body
    const hashedPassword=bcrypt.hashSync(password,10);
    const newUser= new User({fullName,username,email,number,password:hashedPassword,isAdmin})
    await newUser.save()

    res.status(201).send('user created successfully')
    }catch(error){
        next(error)
    }
}