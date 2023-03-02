const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true,
        min  :5 ,
        max : 20
    },
    email : {
        type : String,
        required : true,
        trim : true,
        unique : true ,
        lowercase : true
    },
    password : {
        type : String ,
        required : true,
    },
    phone : {
        type : String ,
        required : true
    }
})
const User = mongoose.model('user', userSchema)
module.exports = User