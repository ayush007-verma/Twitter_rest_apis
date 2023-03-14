const express = require('express');
const router = express.Router();

const { verifyUser } = require('../verifyUser')
const { createTweet, deleteTweet, likeOrDislike, getTweet, getTweetById } = require('../controller/tweet')

// GET ALL TWEETS
router.get('/getTweets', getTweet)

// GET ALL TWEETS BY USER ID
router.get('/getTweets/:id', getTweetById)

// CREATE TWEET ROUTE
router.post('/', verifyUser, createTweet)

// DELETE TWEET
router.delete('/:id', verifyUser, deleteTweet)

// LIKE OR DISLIKE A TWEET
router.put('/:id/like', likeOrDislike)

module.exports = router