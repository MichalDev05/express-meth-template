const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        phone: {
            type: String,
            required: false
        },
        passwordHash: {
            type: String,
            required: true
        },

        //Admin
        isAdmin: {
            type: Boolean,
            default: false
        },
    },
    {
        timestamps: true
    }
);

function arrayLimit3(val) {
    return val.length <= 3;
}

const User = mongoose.model('User', userSchema);

module.exports = User;
