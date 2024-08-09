import Tipo from "../models/tipo.model.js";

export const getTipos = async (req, res) => {
    const tipos = await Tipo.find();
    res.json(tipos);
};

export const createTipo = async (req, res) => {
    const { nombre } = req.body;
    const newTipo = new Tipo({ nombre });
    const saveTipo = await newTipo.save();
    res.json(saveTipo);
}

export const getTipo = async (req, res) => {
    const tipo = await Tipo.findById(req.params.id);
    if (!tipo) return res.status(404).json({ message: "Tipo no encontrado"})
    res.json(tipo);
}

export const deleteTipo = async (req, res) => {
    const tipo = await Tipo.findByIdAndDelete(req.params.id);
    if (!tipo) return res.status(404).json({ message: "Tipo no encontrado"})
    res.sendStatus(204);
 
}

export const updateTipo = async (req, res) => {
    const { nombre } = req.body;
    const tipo = await Tipo.findByIdAndUpdate(req.params.id, { nombre }, { new: true });
    if (!tipo) return res.status(404).json({ message: "Tipo no encontrado"})
    res.json(tipo);
}
