import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/DB.js';
import productRoutes from './routes/products.routes.js';

dotenv.config();

const app = express();

app.use(cors({
  origin:'http://localhost:5173',
  credentials:true,
}))
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.use('/api/product',productRoutes);

app.get('/',(req,res)=>{
res.send('Welcome to backend server');
})
connectDB();
app.listen(PORT,()=>{
  console.log(`Server is running on port -- ${PORT}`);
})