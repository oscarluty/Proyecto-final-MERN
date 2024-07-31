import Categoria from "../models/categoria.model.js";

export const getCategorias = async (req, res) => {
    const categorias = await Categoria.find();
    res.json(categorias);
};

export const createCategoria = async (req, res) => {
    const { nombre } = req.body;
    const newCategoria = new Categoria({ nombre });
    const saveCategoria = await newCategoria.save();
    res.json(newCategoria);
}

export const getCategoria = async (req, res) => {
    const categoria = await Categoria.findById(req.params.id);
    if (!categoria) return res.status(404).json({ message: "Categoria no encontrada"})
    res.json(categoria);
}

export const deleteCategoria = async (req, res) => {
    const categoria = await Categoria.findByIdAndDelete(req.params.id);
    if (!categoria) return res.status(404).json({ message: "Categoria no encontrada"})
    res.sendStatus(204);
}

export const updateCategoria = async (req, res) => {
    const categoria = await Categoria.findByIdAndUpdate(req.params.id, {nombre}, { new: true });
    if (!categoria) return res.status(404).json({ message: "Categoria no encontrada"})
    res.json(categoria);
}