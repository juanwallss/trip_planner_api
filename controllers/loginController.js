const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');
require('dotenv').config();

exports.signup = async (req, res) => {
    try {
        const { nombre, email, contraseña } = req.body;

        // Verificar si el usuario ya existe
        const userExists = await Usuario.findOne({ where: { email } });
        if (userExists) {
            return res.status(400).json({ message: 'El email ya está registrado' });
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(contraseña, 10);

        // Crear el usuario
        const newUser = await Usuario.create({
            nombre,
            email,
            contraseña: hashedPassword,
        });

        res.status(201).json({ message: 'Usuario registrado con éxito' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error en el servidor', error });
    }
}

exports.login = async (req, res) => {
    try {
        const { email, contraseña } = req.body;

        // Buscar usuario
        const user = await Usuario.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }

        // Verificar contraseña
        const isMatch = await bcrypt.compare(contraseña, user.contraseña);
        if (!isMatch) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }

        // Generar tokens
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
        const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        // Guardar refreshToken en la base de datos
        await user.update({ refreshToken });

        res.json({ token, refreshToken });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error });
    }
}

exports.logout = async (req, res) => {
    try {
        const { userId } = req.body;

        // Eliminar el refreshToken del usuario
        await Usuario.update({ refreshToken: null }, { where: { id: userId } });

        res.json({ message: 'Sesión cerrada correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error });
    }
}