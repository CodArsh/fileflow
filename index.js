const dotenv = require("dotenv")
dotenv.config()

const mongoose = require('mongoose')
mongoose.connect(process.env.DB)
    .then(() => {
        console.log("Database connected")
    })
    .catch((error) => {
        console.log("Database not initialized ", error.message)
    })


const express = require("express")
const cors = require('cors')
const { v4: uniqueId } = require("uuid")

const multer = require("multer")
const storage = multer.diskStorage({
    destination: (req, file, next) => {
        next(null, 'files/')
    },
    filename: (req, file, next) => {
        const nameArr = file.originalname.split(".")
        const ext = nameArr.pop()
        const name = `${uniqueId()}.${ext}`
        next(null, name)
    }
})
const upload = multer({ storage: storage })

const { signup, login } = require("./controller/user.controller")
const { createFile, fetchFiles, deleteFile, downloadFile } = require("./controller/file.controller")
const fetchDashboard = require("./controller/dashboard.controller")
const verifyToken = require("./controller/token.controller")
const { shareFile } = require("./controller/share.controller")

const app = express()
app.listen(process.env.PORT || 8080, () => console.log("Server running...", process.env.PORT))

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static("view"))

const demo = (req, res, next) => {
    // if (!req.body.password)
    //     return res.staus(400).json({ message: 'Password is required!' })

    next()
}

app.post('/signup', demo, signup)
app.post('/login', login)
app.post('/file', upload.single('file'), createFile)
app.post('/token/verify', verifyToken)
app.get('/dashboard', fetchDashboard)
app.get('/file', fetchFiles)
app.delete('/file/:id', deleteFile)
app.get('/file/download/:id', downloadFile)
app.post('/share', shareFile)