const fileModel = require('../model/file.model')

const createFile = async (req, res) => {
    try {
     res.status(200).json({ms:'a'})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = createFile