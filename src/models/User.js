const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please enter username.'],
        minLength: [2, 'Username should be at least 2 characters long.']
    },
    email: {
        type: String,
        required: [true, 'Please enter email.'],
        minLength: [10, 'email should be at least 10 characters long.']
    },
    password: {
        type: String,
        required: [true, 'Please enter Password'],
        minLength: [4, 'Password should be at least 4 characters long.']

    },
})

userSchema.virtual('rePassword')
    .set(function (value) {
        if (this.password !== value) {
            throw new Error('Password don\'t match');
        }
    });

userSchema.pre('save', async function () {
    const hash = await bcrypt.hash(this.password, 12);
    this.password = hash;
});

const User = mongoose.model('User', userSchema);

module.exports = User;
