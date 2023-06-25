const express = require('express');
const router = express.Router();

const User = require('../Models/userSchema')

const { verifyUser } = require('../verifyUser');
const { updateUser, deleteUser, follow, unfollow } = require('../controller/user')

// GET ALL USERS DATA
router.get('/getUsers', (req, res) => {
    User.find()
        .then(result => res.status(200).json({ message: 'All Users', users: result }))
        .catch(error => res.status(500).json({ message: 'Server Error', err: error }))
})

// DELETE ALL USERS DATA
router.delete('/deleteUsers', (req, res) => {
    User.deleteMany()
        .then(result => res.status(200).json({ message: 'Users Deleted Successfully', users: result }))
        .catch(error => res.status(500).json({ message: 'Server Error', err: error }))
})

// FIND USER BY ID
router.get('/find/:id', (req, res) => {
    User.findById(req.params.id)
        .then(result => res.status(200).json({ message: 'Success', user: result, statusCode: 200 }))
        .catch(error => res.status(500).json({ message: 'Server Error', err: error, statusCode: 500 }))
})

// find user by firbase user_id
router.get('/findUserId/:id', (req, res) => {
    const {name  ,_id } = User.find({user_id : req.params.id})
        .then(result => res.status(200).json({ message: 'Success', user: result, statusCode: 200  }))
        .catch(error => res.status(500).json({ message: 'Server Error', err: error, statusCode: 500 }))
    })



// UPDATE USER ROUTE
router.put('/:id', updateUser)

// DELETE USER ROUTE
router.delete('/:id', deleteUser)

// FOLLOW
router.put('/follow/:id', follow)

// UNFOLLOW
router.put('/unfollow/:id', unfollow)

module.exports = router