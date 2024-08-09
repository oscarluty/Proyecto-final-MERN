import Contacto from "../models/contacto.model.js";

export const getContactos = async (req, res) => {
    const contactos = await Contacto.find();
    res.json(contactos);
 };

 export const createContacto = async (req, res) => {
    const { nombre, email, mensaje } = req.body;
    const newContacto = new Contacto({ nombre, email, mensaje });
    const saveContacto = await newContacto.save();
    res.json(saveContacto);
 }

 export const getContacto = async (req, res) => {
    const contacto = await Contacto.findById(req.params.id);
    if (!contacto) return res.status(404).json({ message: "Contacto no encontrado" });
    res.json(contacto);
 }

 export const deleteContacto = async (req, res) => {
    const contacto = await Contacto.findByIdAndDelete(req.params.id);
    if (!contacto) return res.status(404).json({ message: "Contacto no encontrado" });
    res.sendStatus(204);
 }

 export const updateContacto = async (req, res) => {
    const contacto = await Contacto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!contacto) return res.status(404).json({ message: "Contacto no encontrado" });
    res.json(contacto);
 }