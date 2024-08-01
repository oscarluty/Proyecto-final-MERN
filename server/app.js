import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import path from 'path';
import { testCloudinaryConnection } from "./cloudinaryConfig.js";

import authRoutes from "./routes/auth.routes.js";
import tasksRoutes from "./routes/tasks.routes.js";
import productRoutes from "./routes/product.routes.js";
import marcasRoutes from "./routes/marcas.routes.js";
import categoriaRoutes from "./routes/categoria.routes.js";
import carruselRoutes from "./routes/carrusel.routes.js";
import { FRONTEND_URL, isProduction } from "./config.js";
import dotenv from "dotenv";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(
    cors({
        credentials: true,
        origin: FRONTEND_URL,
    })
);
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

// API routes
app.use("/api/auth", authRoutes);
app.use("/api", tasksRoutes);
app.use("/api", productRoutes);
app.use("/api", marcasRoutes);
app.use("/api", categoriaRoutes);
app.use("/api", carruselRoutes);

// Serve static files in production
if (isProduction) {
    const clientPath = path.join(__dirname, '../dist');
    if (process.env.NODE_ENV === "production") {
        const clientPath = path.join(__dirname, '../dist');
        app.use(express.static(clientPath));

        app.get("*", (req, res) => {
            const indexPath = path.join(clientPath, 'index.html');
            console.log('Serving index.html from:', indexPath);
            res.sendFile(indexPath);
        });
    }
}

// Ruta de prueba para Cloudinary

app.get('/test-cloudinary', async (req, res) => {
    try {
        const result = await testCloudinaryConnection();
        
    } catch (error) {
        res.status(500).json({ message: 'Error al conectar con Cloudinary', error: error.message });
    }
});

// Prueba la conexión cuando el servidor se inicia
testCloudinaryConnection()
    .then(() => console.log('Cloudinary está configurado correctamente'))
    .catch(error => console.error('Error en la configuración de Cloudinary:', error));


export default app;