import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/DB.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.get('/',(req,res)=>{
res.send('Welcome to backend server');
})
connectDB();
app.listen(PORT,(req,res)=>{
  console.log(`Server is running on port -- ${PORT}`);
})
