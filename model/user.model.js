const { Schema, model } = require('mongoose')
const  bcrypt  = require('bcrypt')

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        lowercase: true
    },
    number: {
        type: String,
        trim: true,
        required: true,
        minlength: 10,
        maxlength: 10
    },
    email: {
        type: String,
        trim: true,
        required: true,
        match: [
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            'Invalid Email!'
        ]
    },
    password: {
        type: String,
        trim: true,
        required: true,
    }
},
    { timestamps: true }
)

userSchema.pre('save', async function (next) {
    const count = await model('User').countDocuments({ number: this.number })
    if (count)
        throw next(new Error('This mobile number is already exist!'))

    next()
})

userSchema.pre('save', async function (next) {
    const count = await model('User').countDocuments({ email: this.email })
    if (count)
        throw next(new Error('This email is already exist!'))

    next()
})

userSchema.pre('save', async function (next) {
    const encryptedPassword = await bcrypt.hash(this.password.toString(), 12)
    this.password = encryptedPassword
    next()
})


const UserModel = model('User', userSchema)
module.exports = UserModel