const jwt = require('jsonwebtoken')
require("dotenv").config();
const secretkey = process.env.SECRET_KEY

const verifyUser = (req, res, next) => {
    try {
        const token = req.cookies.access_token
        if (!token) res.status(401).json({ "message": "You are not authenticated", statusCode: 401 })

        jwt.verify(token, secretkey, (err, user) => {
            if (err) res.status(403).json({ "message": "Token is inavlid", statusCode: 403 })
            req.user = user;
            next();
        })
    } catch (error) {
        res.status(500).json({ "message": "Internal server error", statusCode: 500 });
    }
}

module.exports = { verifyUser }