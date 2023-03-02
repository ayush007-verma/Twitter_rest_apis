const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config();
const crypto = require('crypto')

const nodemailer = require('nodemailer')

const baseUrl = 'http://localhost:3000'

const Signup = require('../Models/userSchema')
const smtpTransport = require('nodemailer-smtp-transport');


const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await Signup.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Generate reset token and save to user document
        // const resetToken = crypto.randomBytes(20).toString("hex");
        // user.resetPasswordToken = resetToken;
        // user.resetPasswordExpires = Date.now() + 3600000; // 1 hour from now
        // await user.save();

        // // Send password reset email to user
        // const transporter = nodemailer.createTransport(smtpTransport({
        //     service: "gmail",
        //     auth: {
        //         user: process.env.EMAIL_ADDRESS,
        //         pass: process.env.EMAIL_PASSWORD,
        //     },
        // }));

        // const mailOptions = {
        //     from: process.env.EMAIL_ADDRESS,
        //     to: email,
        //     subject: "Password Reset Request",
        //     text: `You are receiving this email because you (or someone else) has requested a password reset for your account.\n\nPlease click on the following link or paste it into your browser to complete the process:\n\nhttp://${req.headers.host}/reset/${resetToken}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`,
        // };

        // transporter.sendMail(mailOptions, (error, info) => {
        //     if (error) {
        //         console.log(error);
        //         return res.status(500).json({ message: "Error sending email." });
        //     } else {
        //         console.log("Email sent: " + info.response);
        //         return res.status(200).json({ message: "Password reset email sent." });
        //     }
        // });
        return res.status(200).json({ message: "Password reset email sent." });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error resetting password." });
    }
};

module.exports = forgotPassword