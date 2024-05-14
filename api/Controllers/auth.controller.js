import User from '../Models/user.model.js'
import bcrypt from 'bcrypt'
export const signup=async(req,res,next)=>{
    try{
        console.log('reached:',req.body)

        const {username,email,number,password}=req.body
    const hashedPassword=bcrypt.hashSync(password,10);
    const newUser= new User({username,email,number,password:hashedPassword})
    await newUser.save()

    res.status(201).json({ message: 'User created successfully' });
    }catch(error){
        next(error)
    }
}