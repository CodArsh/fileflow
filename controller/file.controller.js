const fileModel = require('../model/file.model')
const fs  = require('fs')
const createFile = async (req, res) => {
    try {
        const file = req.file
        const payload = {
            filename: file.filename,
            path: (file.destination + file.filename),
            type: file.mimetype.split("/")[0],
            size: file.size
        }
        const newFile = await fileModel.create(payload)
        res.status(200).json({ message: 'File created successfully', data: newFile })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const fetchFiles = async (req, res) => {
    try {
        const data = await fileModel.find()
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const deleteFile = async (req, res) => {
    try {
        const { id } = req.params
        const result = await fileModel.findByIdAndDelete(id)
        if (!result)
            return res.status(404).json({ message: "File not found" })

        fs.unlinkSync(result.path)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { createFile, fetchFiles, deleteFile }