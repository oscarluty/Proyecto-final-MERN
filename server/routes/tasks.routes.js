import { Router } from "express";
import {
    getTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
} from "../controllers/tasks.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { auth } from "../middlewares/auth.middleware.js";


const router = Router();

router.get('/tasks', auth, getTasks)

router.get('/tasks/:id', auth, getTask)

router.post('/tasks', auth, createTask)

router.delete('/tasks/:id', auth, deleteTask)

router.put('/tasks:/:id', auth, updateTask)

export default router