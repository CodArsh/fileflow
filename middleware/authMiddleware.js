const jwt = require('jsonwebtoken')

const authMiddleware = async (req, res, next) => {
    try {
        const { authorization } = req.headers
        if (!authorization)
            return res.status(401).json({ message: 'Invalid request' })

        const [type, token] = authorization.split(" ")

        if (type !== "Bearer")
            return res.status(401).json({ message: 'Invalid request' })

        const user = await jwt.verify(token, process.env.TOKEN_SECRET_KEY)
        req.user = user
        next()
    } catch (error) {
        res.status(401).json({ message: 'Invalid request' })
    }
}

module.exports = authMiddleware