import express from "express";
const app=express()

app.get('/',(req,res)=>{

    res.status(200).send('hello how are you')
})
app.listen(3000,()=>{
    console.log('server running')
})