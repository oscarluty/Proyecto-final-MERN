import { Router } from "express";
import multer from "multer";
import { storage } from "../cloudinaryConfig.js";
import {
    getCarrusel,
    getCarrusels,
    createCarrusel,
    updateCarrusel,
    deleteCarrusel
} from "../controllers/carrusel.controllers.js";

const router = Router();
const upload = multer({ storage: storage });

router.get("/carrusels", getCarrusels);
router.get("/carrusels/:id", getCarrusel);
router.post("/carrusels", upload.single('imagen'), createCarrusel);
router.put("/carrusels/:id", updateCarrusel);
router.delete("/carrusels/:id", deleteCarrusel);

export default router;