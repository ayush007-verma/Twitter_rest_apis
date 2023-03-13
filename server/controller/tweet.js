const Tweet = require('../Models/tweetSchema')

const createTweet = async (req, res, next) => {
    const newTweet = new Tweet(req.body)
    try {
        const savedTweet = await newTweet.save()
        res.status(200).json({message: "Tweet Saved Successfully", data: savedTweet, statusCode: 200})
    } catch (error) {
        res.status(500).json({message: "Tweet Not Saved, some error occurred", data: error, statusCode: 500})
    }
}

const deleteTweet = async (req, res, next) => {
    try {
        const tweet = await Tweet.findById(req.params.id)
        if(tweet.userId === req.body.id) {
            await tweet.deleteOne()
            res.status(200).json({message: "Tweet deleted successfully", statusCode: 200})
        } else {
            res.status(403).json({message: "Not Authenticated", statusCode: 403})
        }
    } catch (error) {
        res.status(500).json({message: error, statusCode: 500})
    }
}

const likeOrDislike = async (req, res, next) => {
    try {
        const tweet = await Tweet.findById(req.params.id)
        if(!tweet.likes.includes(req.body.id)) {
            await tweet.updateOne({
                $push: {
                    likes: req.body.id
                }
            })
            res.status(200).json({message: "Tweet has been liked", statusCode: 200})
        } else {
            await tweet.updateOne({
                $pull: {
                    likes: req.body.id
                }
            })
            res.status(200).json({message: "Tweet has been disliked", statusCode: 200})

        }
    } catch (error) {
        res.status(500).json({message: error, statusCode: 500})
    }
}

module.exports = { createTweet, deleteTweet, likeOrDislike }
