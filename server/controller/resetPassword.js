const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config();
const crypto = require('crypto')

const nodemailer = require('nodemailer')

const baseUrl = 'http://localhost:3000'

const Signup = require('../Models/userSchema')


const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await Signup.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Generate reset token and save to user document
        const resetToken = crypto.randomBytes(20).toString("hex");
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour from now
        await user.save();

        // Send password reset email to user
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_ADDRESS,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_ADDRESS,
            to: email,
            subject: "Password Reset Request",
            text: `Link for resetting your password is \n ${baseUrl}/reset-password?token=${resetToken}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: "Error sending email.", resp: error });
            } else {
                console.log("Email sent: " + info.response);
                return res.status(200).json({ message: "Password reset email sent.", resp: info.response });
            }
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error resetting password.", resp: error });
    }
};

module.exports = forgotPassword