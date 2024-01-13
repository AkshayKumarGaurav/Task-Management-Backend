const express = require('express');
const { connection } = require('mongoose');
const { taskRouter } = require('./routes/Task.route');
const { userRouter } = require('./routes/userRoute');
const app=express();
app.use(express.json())
const PORT = process.env.PORT || 8080;
require("dotenv").config()



app.use('/task',taskRouter)
app.use('/user', userRouter)

app.listen(PORT,async()=>{
    try{
        await connection
        console.log('connected to db')
    }
    catch(err){
        console.log(err)
    }
    console.log(`server is running at ${PORT}`)
})