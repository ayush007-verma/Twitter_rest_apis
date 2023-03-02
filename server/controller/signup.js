const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config();

const Signup = require('../Models/userSchema')

const secretkey = process.env.SECRET_KEY

const signup =  (req, res) => {
    const saltRounds = 10
    bcrypt.hash(req.body.password, saltRounds)
        .then(result => {
            const user = new Signup({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                name: req.body.name,
                phone: req.body.phone,
                password: result
            })
            Signup.find( {email: req.body.email} )
            .then( result => {
                // If the email does not exist in the DB
                if(result.length === 0) {
                    const token = jwt.sign({ id: user._id }, secretkey, { expiresIn: '1h' })
                    user.save()
                    .then(result => res.status(201).json( {message: 'User Signup Successful!', userDetails: result, accessToken: token} ))
                    .catch(error => res.status(500).json( {message: 'error occured in the DB', err: error} ))
                } else {
                    res.status(400).json( {message: 'Email already exists, try again with a different email'} )
                }
            })
            .catch(error => res.status(500).json( {message: 'error occured in the DB', err: error} ))
        })
        .catch(err => res.status(500).json( {message: 'Server encounteerd an error, please try again later', error: err} ))
    }

module.exports = signup