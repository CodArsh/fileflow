const { Schema, model } = require('mongoose')

const fileSchema = new Schema({
    filename: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    path: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    type: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    size: {
        type: Number,
        required: true,
    }

}, { timestamps: true })

const fileModel = model('File', fileSchema)
module.exports = fileModel