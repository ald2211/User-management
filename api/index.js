import express from "express";
import mongoose from "mongoose";
import dotenv  from "dotenv";
import userRouter from './Routes/user.route.js';
import authRouter from './Routes/auth.route.js';
//configue env file
dotenv.config()

const port = process.env.PORT || 5000
//connect mongodb
mongoose.connect(process.env.MONGO).then(()=>{
    console.log('connected to db');
}).catch((err)=>{
    console.log('error:',err)
})
const app=express()

app.use(express.json())
//listen port
app.listen(port,()=>{
    console.log('server running')
})

//routers
app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);

//error first callback
app.use((err,req,res,next)=>{

    const statusCode=err.statusCode || 500
    const message=err.message || 'internal server error'

    return res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})