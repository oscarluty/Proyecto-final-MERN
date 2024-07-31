import Marca from "../models/marcas.model.js";
export const getMarcas = async (req, res) => {
    const marcas = await Marca.find();
    res.json(marcas);  // Devuelve un array de marcas en formato JSON  //
};

export const createMarca = async (req, res) => {
    const { nombre } = req.body;
    const newMarca = new Marca({ nombre });
    const saveMarca = await newMarca.save();
    res.json(saveMarca);
}

export const getMarca = async (req, res) => {
    const marca = await Marca.findById(req.params.id);
    if (!marca) return res.status(404).json({ message: "Marca no encontrada" });
    res.json(marca);
}

export const deleteMarca = async (req, res) => {
    const marca = await Marca.findByIdAndDelete(req.params.id);
    if (!marca) return res.status(404).json({ message: "Marca no encontrada" });
    res.sendStatus(204);
}

export const updateMarca = async (req, res) => {
    const { nombre } = req.body;
    const marca = await Marca.findByIdAndUpdate(req.params.id, { nombre }, { new: true });
    if (!marca) return res.status(404).json({ message: "Marca no encontrada" });
    res.json(marca);
}