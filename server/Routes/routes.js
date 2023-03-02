const express = require('express')
const router = express.Router()


const User = require('../Models/userSchema')
router.get('/getUsers', (req, res) => {
    User.find()
        .then(result => res.status(200).json( {message: 'All Users', users: result} ))
        .catch(error => res.status(500).json( {message: 'Server Error', err: error} ))
})

const signup = require('../controller/signup')
router.post('/signup', signup)


module.exports = router