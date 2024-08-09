import {getRoles} from "../controllers/roles.controllers.js";
import { Router } from "express";

const router = Router();

router.get("/roles", getRoles);

export default router;