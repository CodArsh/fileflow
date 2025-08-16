const jwt = require('jsonwebtoken')

const verifyToken = async (req, res) => {
    try {
        const payload = await jwt.verify(req.body.token, process.env.TOKEN_SECRET_KEY)
        res.status(200).json({ message: 'User verified', data: payload })
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' })
    }
}

module.exports = verifyToken