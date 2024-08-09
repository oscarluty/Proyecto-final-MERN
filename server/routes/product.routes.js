import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
} from "../controllers/products.controller.js";
import { storage } from "../cloudinaryConfig.js";
import multer from "multer";


const router = Router()
const upload = multer({ storage: storage });


router.get('/products', getProducts)
router.get('/products/:id', getProduct)
router.post('/products', createProduct)
router.delete('/products/:id', deleteProduct)
router.put('/products/:id', upload.single('imagen'), updateProduct)

export default router;