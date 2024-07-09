
import { useParams } from 'react-router-dom';
import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { createAccessToken } from '../libs/jwt.js';

export const register = async (req, res) => {
    const { email, password, nombre, apellido, telefono } = req.body

    try {

        const userFound = await User.findOne({ email });
        if (userFound) 
            return res.status(400).json(['El email ya está registrado']);


        const passwordHash = await bcrypt.hash(password, 10)

        const newUser = new User({
            email,
            nombre,
            apellido,
            telefono,
            password: passwordHash,
        });

        const userSaved = await newUser.save()
        const token = await createAccessToken({ id: newUser._id })

        res.cookie('token', token);
        res.json({
            id: userSaved._id,
            nombre: userSaved.nombre,
            apellido: userSaved.apellido,
            telefono: userSaved.telefono,
            email: userSaved.email,
            rol: userSaved.rol,
            createdAt: newUser.createdAt,
            updatedAt: newUser.updatedAt,
        })
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body

    try {

        const unserFound = await User.findOne({email}) 

        if (!unserFound) {
            return res.status(400).json({ message: 'Usuario no encontrado' })
        }

        const isMatch = await bcrypt.compare(password, unserFound.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Contraseña incorrecta' })
        }

        const token = await createAccessToken({ id: unserFound._id })

        res.cookie('token', token);
        res.json({
            id: unserFound._id,
            username: unserFound.username,
            email: unserFound.email,
            rol: unserFound.rol,
            createdAt: unserFound.createdAt,
            updatedAt: unserFound.updatedAt,
        })
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
};

export const logout = (req, res) => {
    res.cookie('token', '',{
        expires: new Date(0),
    });
    return res.sendStatus(200);
    console.log('se cerró la sesion');
}

export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id)

    if (!userFound) return res.status(400).json({ message: "Usuario no encontrado" });

    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        rol: userFound.rol,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
    })
}