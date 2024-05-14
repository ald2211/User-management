import express from "express";
import mongoose from "mongoose";
import dotenv  from "dotenv";
import userRouter from './Routes/user.route.js';
import authRouter from './Routes/auth.route.js';
import cors from 'cors'
import cookieParser from"cookie-parser"
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

// Configure CORS to allow requests from http://localhost:5173
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true // Allow credentials (cookies)
  };
  app.use(cors(corsOptions));
app.use(express.json())
app.use(cookieParser());
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