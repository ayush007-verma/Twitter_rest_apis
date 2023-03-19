const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    user_id: {      // this is the user id we will get from firebase
        type: String,
        required: true
    },
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
    },
    token: {
        type: String,
        defaultValue: ''
    }
},
    {
        timestamps: true
    }
);

const User = mongoose.model('user', userSchema)
module.exports = User