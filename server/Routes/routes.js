const express = require('express')
const router = express.Router()


const User = require('../Models/userSchema')

// HOME ROUTE
router.get('/', (req, res) => res.send('Home route'))


// GET ALL USERS DATA
router.get('/getUsers', (req, res) => {
    User.find()
        .then(result => res.status(200).json( {message: 'All Users', users: result} ))
        .catch(error => res.status(500).json( {message: 'Server Error', err: error} ))
})

const {signup, signin} = require('../controller/auth')

const forgotPassword = require('../controller/resetPassword')

// AUTH ROUTES
router.post('/signup', signup)
router.post('/signin', signin)

// RESET PASSWORD ROUTE
router.post('/forgotPassword', forgotPassword)


module.exports = router