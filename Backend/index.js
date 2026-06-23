import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/DB.js';
import productRoutes from './routes/products.routes.js';
import serverless from 'serverless-http'; 

dotenv.config();

const app = express();

app.use(cors({
  origin: '*',
  credentials: true,
}));

app.use(express.json());

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    res.status(500).json({ message: "Database connection failed in serverless instance" });
  }
});

app.use('/api/product', productRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to backend server');
});

export default app;
export const handler = serverless(app);