const express = require('express');
const router = express.Router();

const { verifyUser } = require('../verifyUser')
const { createTweet, deleteTweet, likeOrDislike } = require('../controller/tweet')

// CREATE TWEET ROUTE
router.post('/', verifyUser, createTweet)

// DELETE TWEET
router.delete('/:id', verifyUser, deleteTweet)

// LIKE OR DISLIKE A TWEET
router.put('/:id/like', likeOrDislike)

module.exports = router