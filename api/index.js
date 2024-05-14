import express from "express";
import mongoose from "mongoose";
import dotenv  from "dotenv"
dotenv.config()

const port = process.env.PORT || 5000
mongoose.connect(process.env.MONGO).then(()=>{
    console.log('connected to db');
}).catch((err)=>{
    console.log('error:',err)
})
const app=express()

app.get('/',(req,res)=>{

    res.status(200).send('hello how are you')
})
app.listen(port,()=>{
    console.log('server running')
})