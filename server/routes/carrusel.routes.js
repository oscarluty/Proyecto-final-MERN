import { Router } from "express";
import {
    getCarrusel,
    getCarrusels,
    createCarrusel,
    updateCarrusel,
    deleteCarrusel
} from "../controllers/carrusel.controllers.js";

const router = Router();

router.get("/carrusels", getCarrusels);

router.get("/carrusels/:id", getCarrusel);

router.post("/carrusels", createCarrusel);

router.put("/carrusels/:id", updateCarrusel);

router.delete("/carrusels/:id", deleteCarrusel);

export default router;