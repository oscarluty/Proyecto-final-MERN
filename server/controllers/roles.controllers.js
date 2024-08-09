import Rol from "../models/roles.model.js";

export const getRoles = async (req, res) => {
    try {
        const roles = await Rol.find();
        res.json(roles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};