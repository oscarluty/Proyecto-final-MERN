import { Router } from "express";
import {
    getContactos,
    getContacto,
    createContacto,
    updateContacto,
    deleteContacto
} from "../controllers/contacto.controller.js"

const router = Router();

router.get("/contactos", getContactos);

router.get("/contactos/:id", getContacto);

router.post("/contactos", createContacto);

router.put("/contactos/:id", updateContacto);

router.delete("/contactos/:id", deleteContacto);

export default router;