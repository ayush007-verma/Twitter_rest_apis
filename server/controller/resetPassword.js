const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config();
const crypto = require('crypto')

const nodemailer = require('nodemailer')

const baseUrl = 'http://localhost:5000'

const User = require('../Models/userSchema')


const forgotPassword = async (req, res) => {
    const { email } = req.body;
    // const name = req.body.name;
    try {
        const user = await User.findOne({ email: email });
        const name = user.name
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Generate reset token and save to user document
        const resetToken = crypto.randomBytes(20).toString("hex");
        const data = await User.updateOne(
            { email: email },
            { $set: { token: resetToken } }
        );

        // Send password reset email to user
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_ADDRESS,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const htmlToSend = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>Reset Password Email</title>
            </head>
            <body>
                <p>Hi `+ name + `,</p>
                <p>Please copy the link and <a href=`+ `${baseUrl}/api/auth/reset-password?token=${resetToken}` + `>reset your password</a></p>
            </body>
            </html>`;
        const mailOptions = {
            from: process.env.EMAIL_ADDRESS,
            to: email,
            subject: "Password Reset Request",
            html: htmlToSend
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: "Error sending email.", resp: error });
            } else {
                console.log("Email sent: " + info.response);
                res.status(200).json({ message: "Password reset email sent.", resp: info.response });
            }
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error resetting password.", resp: error });
    }
};

const resetPassword = async (req, res) => {
    try {
        const token = req.query.token;
        const tokenData = await User.findOne({token: token})

        if(!tokenData) res.status(498).json({ message: "Link is expired", statusCode: 498 });

        const password = req.body.password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds)

        const userData = await User.findByIdAndUpdate({
            _id: tokenData._id
            },
            {
                $set: {
                    password: hashedPassword,
                    token: ''
                }
            },
            {
                new: true
            }
        )
        res.status(200).json({ message: "Password has been reset.", data: userData, statusCode: 200 });
    } catch (error) {
        res.status(500).json({ message: "Error resetting password.", resp: error });
    }
}

module.exports = { forgotPassword, resetPassword }