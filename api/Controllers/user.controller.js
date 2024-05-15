import { errorHandler } from "../utils/Error.js"
import bcrypt from 'bcrypt'
import User from '../Models/user.model.js'
export const getUser=(req,res)=>{

    res.json({message:'hello hey'})
}


export const updateUser=async(req,res,next)=>{
    console.log('params:',req.params.id)
    console.log('reached:',req.body);
    if(req.user.id!==req.params.id)return(errorHandler(401,'not authenticated'))
    try{
        const updateFields = {};

    if (req.body.username) {
        updateFields.username = req.body.username;
    }
    if (req.body.email) {
        updateFields.email = req.body.email;
    }
    if (req.body.number) {
        updateFields.number = req.body.number;
    }
    if (req.file) {
        updateFields.avatar = req.file.filename;
    }
    if (req.body.password) {
        updateFields.password = bcrypt.hashSync(req.body.password, 10);
    }
    const updateUser = await User.findByIdAndUpdate(req.params.id, { $set: updateFields }, { new: true });

        const {password,...rest}=updateUser._doc
        res.status(200).json(rest)
    }catch(error){
        next(error)
    }
}