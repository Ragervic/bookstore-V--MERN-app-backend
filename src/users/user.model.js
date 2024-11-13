const mongoose = require('mongoose')
const bcrypt= require('bcrypt')

// schema creation
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        required: true
    }


})
// A salt is a random data fed to a password before hashing to make it difficult to crack the password, 10 is the salt
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next();
})

const User = mongoose.model('User', userSchema);
module.exports = User;