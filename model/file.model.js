const { Schema, model, default: mongoose } = require('mongoose')

const fileSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
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