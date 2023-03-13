const User = require("../Models/userSchema");
const Tweet = require('../Models/tweetSchema')

const updateUser = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                {
                    new: true,
                }
            );
            res.status(200).json({ message: "User Updated successfully", "userDetails": updatedUser, statusCode: 200 });
        } catch (error) {
            return res.status(500).json({message: "Some error occured", err: error, statusCode: 500})
        }
    } else {
        return res.status(403).json({message: "You are not authorized to update this user's data", statusCode: 403})
    }
};

const deleteUser = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            await User.findByIdAndDelete(req.params.id)
            await Tweet.remove({
                userId: req.params.id
            })
            res.status(200).json({ message: "User Deleted successfully", statusCode: 200 });
        } catch (error) {
            return res.status(500).json({message: "Some error occured", err: error, statusCode: 500})
        }
    } else {
        return res.status(403).json({message: "You are not authorized to delete this user's data", statusCode: 403})
    }
};

const follow = async (req, res, next) => {
    try {

        // user
        const user = await User.findById(req.params.id)

        // logged in current user
        const currentUser = await User.findById(req.body.id)

        if(!user.followers.includes(req.body.id)) {
            await User.updateOne({
                $push: {followers: req.body.id},
            });

            await currentUser.updateOne({
                $push: {following: req.params.id},
            });
        } else {
            res.status(403).json({ message: "You already follow this user", statusCode: 403 });
        }
        res.status(200).json({ message: "Following the User", statusCode: 200 });

    } catch (error) {
        return res.status(500).json({message: "Some error occured", err: error, statusCode: 500})
    }
};

const unfollow = async (req, res, next) => {
    try {

        // user
        const user = await User.findById(req.params.id)

        // logged in current user
        const currentUser = await User.findById(req.body.id)

        if(currentUser.following.includes(req.params.id)) {
            await user.updateOne({
                $pull: {followers: req.body.id},
            });

            await currentUser.updateOne({
                $pull: {following: req.params.id},
            });
        } else {
            res.status(403).json({ message: "You are not following this user", statusCode: 403 });
        }
        res.status(200).json({ message: "UnFollowed the User", statusCode: 200 });

    } catch (error) {
        return res.status(500).json({message: "Some error occured", err: error, statusCode: 500})
    }
};

module.exports = { updateUser, deleteUser, follow, unfollow };
