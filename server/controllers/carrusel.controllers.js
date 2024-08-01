import Carrusel from "../models/carrusel.model.js";

export const getCarrusels = async (req, res) => {
    const carrusel = await Carrusel.find();
    res.json(carrusel);
};

export const createCarrusel = async (req, res) => {
    const {imagen} = req.body;
    const newCarrusel = new Carrusel({imagen});
    const saveCarrusel = await newCarrusel.save();
    res.json(saveCarrusel);
}

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