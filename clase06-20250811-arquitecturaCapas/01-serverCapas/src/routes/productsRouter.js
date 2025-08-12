import { Router } from 'express';
import { ProductsController } from '../controllers/ProductsController.js';
export const router=Router()

router.get('/', ProductsController.getProducts)
router.post('/', ProductsController.createProduct)