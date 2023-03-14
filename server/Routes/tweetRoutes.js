const express = require('express');
const router = express.Router();

const { verifyUser } = require('../verifyUser')
const { createTweet, deleteTweet, likeOrDislike, getTweet, getAllTweets, getUserTweets } = require('../controller/tweet')

// GET ALL TWEETS
router.get('/getTweets', getTweet)

// GET ALL TIMELINE TWEETS
router.get('/getTweets/:id', verifyUser, getAllTweets)

// GET CURRENT USER TWEETS ONLY
router.get('/getTweets/all/:id', getUserTweets)

// CREATE TWEET ROUTE
router.post('/', verifyUser, createTweet)

// DELETE TWEET
router.delete('/:id', verifyUser, deleteTweet)

// LIKE OR DISLIKE A TWEET
router.put('/:id/like', likeOrDislike)

module.exports = router