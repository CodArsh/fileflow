const { mongoose, Schema, model } = require('mongoose')

const shareSchema = new Schema({
    from: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    to: {
        type: String,
        required: true,
        trim: true
    },
    file: {
        type: mongoose.Types.ObjectId,
        ref: 'File',
        required: true
    }
})

const shareModel = model('Share', shareSchema)
module.exports = shareModel