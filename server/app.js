import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import path from 'path';

import authRoutes from "./routes/auth.routes.js";
import tasksRoutes from "./routes/tasks.routes.js";
import { FRONTEND_URL } from "./config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

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

// Serve static files in production
if (process.env.NODE_ENV === "production") {
    const clientPath = path.join(__dirname, '../client/dist');
    app.use(express.static(clientPath));
  
    app.get("*", (req, res) => {
        const indexPath = path.join(clientPath, 'index.html');
        console.log('Serving index.html from:', indexPath);
        res.sendFile(indexPath);
    });
}

export default app;