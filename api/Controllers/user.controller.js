import { errorHandler } from "../utils/Error.js"
import bcrypt from 'bcrypt'
import User from '../Models/user.model.js'



export const updateUser=async(req,res,next)=>{
   
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

 export const deleteUser=async(req,res,next)=>{

    if(req.user.id!==req.params.id)return(errorHandler(401,'not authenticated')) 
    
        try{
            await User.findByIdAndDelete(req.params.id)
            res.clearCookie('access_token');
            res.status(200).json({message:'user deleted successfully'})
        }catch(error){

            next(error)
        }


}

//admin
export const getUsers= async(req,res,next)=>{
    if(!req.user.isAdmin){
        return next(errorHandler(403,'no authorization'))
    }
    try{
       
        const startIndex=parseInt(req.query.startIndex)||0
        const limit =parseInt(req.query.limit)||10
        const sortDirection=req.query.sort==='asc'?1:-1;

        const users=await User.find()
        .sort({createdAt:sortDirection})
        .skip(startIndex)
        .limit(limit)

        const usersWithoutPassword=users.map((user)=>{
            const {password,...rest}=user._doc
            return rest
        })

        const totalUsers=await User.countDocuments()

        const oneMonthAgo=new Date(
            now.getFullYear(),
            now.getMonth()-1,
            now.getDate()
        )

        const lastMonthUsers=await User.countDocuments({
            createdAt:{$gte:oneMonthAgo}
        })
        res.status(200).json({
            users:usersWithoutPassword,
            totalUsers,
            lastMonthUsers
        })
    }catch(error){
        next(error)
    }
}