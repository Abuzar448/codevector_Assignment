import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/DB.js';
import productRoutes from './routes/products.routes.js';

dotenv.config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT;

app.use('/api/product',productRoutes); 

app.get('/',(req,res)=>{
res.send('Welcome to backend server');
})
connectDB();
app.listen(PORT,(req,res)=>{
  console.log(`Server is running on port -- ${PORT}`);
})
