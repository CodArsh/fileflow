const UserModel = require("../model/user.model")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const signup = async (req, res) => {
    try {
        await UserModel.create(req.body)
        res.status(200).json({ message: 'User created successfully!' })

    } catch (error) {
        res.status(500).json(error.message)
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await UserModel.findOne({ email: email })

        if (!user)
            return res.status(404).json({ message: `User doesn't exist!` })

        const isLogin = bcrypt.compareSync(password, user.password)
        if (!isLogin)
            return res.status(401).json({ message: `Incorrect password!` })

        const payload = {
            email: user.email,
            number: user.number,
            name: user.name,
            id: user._id
        }
        const token = await jwt.sign(payload, process.env.TOKEN_SECRET_KEY, { expiresIn: '3d' })
        res.status(200).json({ message: 'Login successfull!', token: token, data: payload })

    } catch (error) {
        res.status(500).json(error.message)
    }
}

module.exports = {
    signup,
    login
}