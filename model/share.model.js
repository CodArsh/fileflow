const { mongoose, Schema, model } = require('mongoose')

const shareSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receivedEmail: {
        type: String,
        required: true,
        trim: true
    },
    file: {
        type: mongoose.Types.ObjectId,
        ref: 'File',
        required: true
    }
}, { timestamps: true })

const shareModel = model('Share', shareSchema)
module.exports = shareModel