const fileModel = require('../model/file.model')
const fs = require('fs')
const path = require('path')
const createFile = async (req, res) => {
    try {
        const { filename } = req.body
        const file = req.file
        const payload = {
            user: req.user.id,
            filename: filename,
            path: (file.destination + file.filename),
            type: file.mimetype.split("/")[0],
            size: file.size
        }
        const newFile = await fileModel.create(payload)
        res.status(200).json({ message: 'File uploaded successfully', data: newFile })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const fetchFiles = async (req, res) => {
    try {
        const data = await fileModel.find({ user: req.user.id }).sort({ createdAt: -1 })
        res.status(200).json({ status: 200, data: data })
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

        await fs.unlinkSync(result.path)
        res.status(200).json({ message: 'File deleted', status: 200 })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const downloadFile = async (req, res) => {
    try {
        console.log('object', req.body)
        const { id } = req.params
        const file = await fileModel.findById(id)
        if (!file)
            return res.status(404).json({ message: "File not found" })

        const root = process.cwd()
        const filePath = path.join(root, file.path)
        res.setHeader('Content-Disposition', `attachment; filename="${file.filename}"`)
        res.sendFile(filePath, (error) => {
            if (error) {
                res.status(404).json({ message: "File not found" })
            }
        })
    } catch (error) {
        console.log(error.message)
    }
}
module.exports = { createFile, fetchFiles, deleteFile, downloadFile }