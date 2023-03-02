const express = require('express')
const router = express.Router()
const User = require('./Models/userSchema')

router.get('/signup', (req, res) => {
    User.find()
        .then(result => res.status(200).json( {message: 'All Products', users: result} ))
        .catch(error => res.status(500).json( {message: 'Server Error', err: error} ))
})


module.exports = router