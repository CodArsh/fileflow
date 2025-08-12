const dotenv = require('dotenv')
dotenv.config()

const mongoose = require('mongoose')
mongoose.connect(process.env.DB)
    .then(() => {
        console.log("Database connected")
    })
    .catch((error) => {
        console.log("Database not initialized ", error.message)
    })

const express = require('express')
const { createUser } = require('./controller/user.controller')
const app = express()
app.listen(process.env.PORT || 8080, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})

app.use(express.static("view"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.post('/user', createUser)