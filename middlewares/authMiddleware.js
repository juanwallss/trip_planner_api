const jwt = require('jsonwebtoken')
require('dotenv')

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({message: 'Acceso no autorizado'})
    }

    const token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (er) {
        return res.status(403).json({message: 'Token invalido'})
    }
}

module.exports = authMiddleware