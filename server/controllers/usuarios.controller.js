import User from "../models/user.model.js";

export const getUsuarios = async (req, res) => {
    
    const usuarios = await User.find();
    res.json(usuarios);
}