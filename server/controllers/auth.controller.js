import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { createAccessToken } from '../libs/jwt.js';
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const register = async (req, res) => {
    try {

        const { email, password, nombre, apellido, telefono } = req.body;

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
        const token = await createAccessToken({
            id: userSaved._id,
          });

          res.cookie("token", token, {
            httpOnly: process.env.NODE_ENV !== "development",
            secure: true,
            sameSite: "none",
          });

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
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const userFound = await User.findOne({ email })

        if (!userFound) {
            return res.status(400).json({ message: 'Usuario no encontrado' })
        }

        const isMatch = await bcrypt.compare(password, userFound.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Contraseña incorrecta' })
        }

        const token = await createAccessToken({
            id: userFound._id,
            username: userFound.username,
          });

        res.cookie('token', token, {
            httpOnly: process.env.NODE_ENV !== "development",
            secure: true,
            sameSite: "none",
          });

        res.json({
            id: userFound._id,
            nombre: userFound.nombre,
            apellido: userFound.apellido,
            telefono: userFound.telefono,
            email: userFound.email,
            rol: userFound.rol,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const logout = async (req, res) => {
    res.cookie("token", "", {
      httpOnly: true,
      secure: true,
      expires: new Date(0),
    });
    return res.sendStatus(200);
  };

export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id)

    if (!userFound) return res.status(400).json({ message: "Usuario no encontrado" });

    return res.json({
        id: userFound._id,
        nombre: userFound.nombre,
        apellido: userFound.apellido,
        telefono: userFound.telefono,
        email: userFound.email,
        rol: userFound.rol,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
    })
}

export const getUsers = async (req, res) => {
    try {
        // Obtener todos los usuarios de la base de datos
        const users = await User.find({}, '-password') // Excluimos el campo password

        // Si no hay usuarios, devolver un mensaje
        if (users.length === 0) {
            return res.status(404).json({ message: 'No se encontraron usuarios' })
        }

        // Devolver la lista de usuarios
        res.json(users)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const verifyToken = async (req, res) => {
  const { token } = req.cookie;
  if (!token) return res.send(false);

  jwt.verify(token, TOKEN_SECRET, async (error, user) => {
    if (error) return res.sendStatus(401);

    const userFound = await User.findById(user.id);
    if (!userFound) return res.sendStatus(401);

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  });
};