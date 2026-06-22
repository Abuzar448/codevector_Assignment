import express from 'express';
// Fixed: Named imports use kar rahe hain ab hum
import { addProduct, getProducts } from '../controllers/product.controllers.js'; 

const router = express.Router();

router.post('/addProduct', addProduct);

router.get('/getProducts', getProducts);

export default router;