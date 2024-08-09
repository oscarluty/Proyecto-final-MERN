import Carrusel from "../models/carrusel.model.js";
import multer from "multer";
import { storage, cloudinary } from "../cloudinaryConfig.js";


export const getCarrusels = async (req, res) => {
    const carrusel = await Carrusel.find();
    res.json(carrusel);
};

export const createCarrusel = async (req, res) => {
    try {
        console.log('Req.file:', req.file);
        console.log('Req.body:', req.body);
        if (!req.file) {
            return res.status(400).json({ message: 'No se ha proporcionado ninguna imagen' });
        }

        // Sube la imagen a Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);

        // Crea un nuevo documento de Carrusel con la URL de la imagen
        const newCarrusel = new Carrusel({
            imagen: req.file.path, // Cloudinary devuelve la URL en req.file.path
        });

        // Guarda el nuevo Carrusel en la base de datos
        const savedCarrusel = await newCarrusel.save();

        res.status(201).json(savedCarrusel);
    } catch (error) {
        console.error('Error al crear el carrusel:', error);
        res.status(500).json({ message: 'Error al crear el carrusel', error: error.message });
    }
};

export const getCarrusel = async (req, res) => {
    const carrusel = await Carrusel.findById(req.params.id);
    if (!carrusel) return res.status(404).json({message: "Imagen no encontrada"});
    res.json(carrusel);
}

export const deleteCarrusel = async (req, res) => {
    const carrusel = await Carrusel.findByIdAndDelete(req.params.id);
    if (!carrusel) return res.status(404).json({message: "Imagen no encontrada"});
    res.sendStatus(204);
}

export const updateCarrusel = async (req, res) => {
    const {imagen} = req.body;
    const carrusel = await Carrusel.findByIdAndUpdate(req.params.id, {imagen}, {new: true});
    if (!carrusel) return res.status(404).json({message: "Imagen no encontrada"});
    res.json(carrusel);
}