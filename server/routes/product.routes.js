import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
} from "../controllers/products.controller.js";

const router = Router()

router.get('/products', getProducts)
router.get('/products/:id', getProduct)
router.post('/products', createProduct)
router.delete('/products/:id', deleteProduct)
router.put('/products/:id', updateProduct)

export default router;