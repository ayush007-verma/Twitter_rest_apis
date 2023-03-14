const express = require('express')
const router = express.Router()

// HOME ROUTE
router.get('/', (req, res) => res.send('Home route'))

const {signup, signin} = require('../controller/auth')

const {forgotPassword, resetPassword} = require('../controller/resetPassword')

// AUTH ROUTES
router.post('/signup', signup)
router.post('/signin', signin)

// FORGOT PASSWORD ROUTE
router.post('/forgotPassword', forgotPassword)

router.get('/reset-password', resetPassword)


module.exports = router