const Tweet = require('../Models/tweetSchema')
const User = require('../Models/userSchema')

const getTweet = async (req, res) => {
    try {
        const Tweets = await Tweet.find({})
        res.status(200).json({ message: "All Tweets Successfully retrieved", data: Tweets, statusCode: 200 })
    } catch (error) {
        res.status(500).json({ message: "Some error occurred", data: error, statusCode: 500 })
    }
}

const createTweet = async (req, res, next) => {
    const newTweet = new Tweet(req.body)
    try {
        const savedTweet = await newTweet.save()
        res.status(200).json({ message: "Tweet Saved Successfully", data: savedTweet, statusCode: 200 })
    } catch (error) {
        res.status(500).json({ message: "Tweet Not Saved, some error occurred", data: error, statusCode: 500 })
    }
}

const deleteTweet = async (req, res, next) => {
    try {
        const tweet = await Tweet.findById(req.params.id)
        if (tweet.userId === req.body.id) {
            await tweet.deleteOne()
            res.status(200).json({ message: "Tweet deleted successfully", statusCode: 200 })
        } else {
            res.status(403).json({ message: "Not Authenticated", statusCode: 403 })
        }
    } catch (error) {
        res.status(500).json({ message: error, statusCode: 500 })
    }
}

const likeOrDislike = async (req, res, next) => {
    try {
        const tweet = await Tweet.findById(req.params.id)
        if (!tweet.likes.includes(req.body.id)) {
            await tweet.updateOne({
                $push: {
                    likes: req.body.id
                }
            })
            res.status(200).json({ message: "Tweet has been liked", statusCode: 200 })
        } else {
            await tweet.updateOne({
                $pull: {
                    likes: req.body.id
                }
            })
            res.status(200).json({ message: "Tweet has been disliked", statusCode: 200 })

        }
    } catch (error) {
        res.status(500).json({ message: error, statusCode: 500 })
    }
}

const getAllTweets = async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.id)
        const userTweets = await Tweet.find({ userId: currentUser._id })
        const followerTweets = await Promise.all(
            currentUser.following.map((followerId) => {
                return Tweet.find({ userId: followerId })
            })
        );
        res.status(200).json({message: userTweets.concat(...followerTweets), statusCode: 200});
    } catch (error) {
        res.status(500).json({ message: error, statusCode: 500 })
    }
}

const getUserTweets = async (req, res) => {
    try {
        const userTweets = await Tweet.find({userId: req.params.id}).sort({
            createdAt: -1
        })
        res.status(200).json({message: userTweets, statusCode: 200});
    } catch (error) {
        res.status(500).json({ message: error, statusCode: 500 })
    }
}

const getExploreTweets = async (req, res) => {
    try {
        const exploreTweets = await Tweet.find({
            likes: {
                $exists: true
            },
        }).sort({ likes: -1 })
        res.status(200).json({message: exploreTweets, statusCode: 200});
    } catch (error) {
        res.status(500).json({ message: error, statusCode: 500 })
    }
}

module.exports = { getTweet, createTweet, deleteTweet, likeOrDislike, getAllTweets, getUserTweets, getExploreTweets }
