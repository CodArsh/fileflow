const UserModel = require("../model/user.model")

const createUser = async (req, res) => {
    try {
        await UserModel.create(req.body)
        res.status(200).json({ message: 'User created successfully!' })

    } catch (error) {
        res.status(500).json(error.message)
    }
}

module.exports = {
    createUser
}