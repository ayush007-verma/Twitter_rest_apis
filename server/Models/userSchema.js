const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
    },
    followers: {
        type: Array,
        defaultValue: []
    },
    following: {
        type: Array,
        defaultValue: []
    },
    description: {
        type: String
    }
},
    {
        timestamps: true
    }
);

const User = mongoose.model('user', userSchema)
module.exports = User