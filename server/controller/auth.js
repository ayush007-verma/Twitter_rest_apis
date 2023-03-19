const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const admin = require('../Database/firebaseConfig')

const User = require("../Models/userSchema");

const secretkey = process.env.SECRET_KEY;

const emailRegex = /\S+@\S+\.\S+/;
const phoneRegex = /^\d{10}$/;

// (?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$

const validateUser = (user) => {
  const { email, name, phone, password } = user;
  const errors = [];

  if (!email || !email.trim()) {
    errors.push("Email is required");
  } else if (!emailRegex.test(email)) {
    errors.push("Email is invalid");
  }

  if (!name || !name.trim()) {
    errors.push("Name is required");
  }

  if (!phone || !phone.trim()) {
    errors.push("Phone is required");
  } else if (!phoneRegex.test(phone)) {
    errors.push("Phone is invalid");
  }

  if (!password || password.length < 5) {
    errors.push("Password is required and must be at least 5 characters long");
  }

  return errors.length === 0 ? null : { message: errors.join(", ") };
};

const signup = async (req, res) => {
  try {
    const errors = validateUser(req.body);
    if (errors) {
      return res.status(400).json(errors);
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      email: req.body.email,
      name: req.body.name,
      phone: req.body.phone,
      password: hashedPassword,
    });
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      res
        .status(400)
        .json({
          message: "Email already exists, try again with a different email",
          statusCode: 400
        });
    }
    const token = jwt.sign({ id: user._id }, secretkey);
    const savedUser = await user.save();
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(201)
      .json({ message: "User Signup Successful!", userDetails: savedUser, statusCode: 201 });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Server encountered an error, please try again later",
        error: error,
        statusCode: 500
      });
  }
};

const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      res
        .status(404)
        .json({ message: "Authentication failed. User not found.", statusCode: 404 });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      res
        .status(401)
        .json({ message: "Authentication failed. Wrong password.", statusCode: 401 });
    }
    const token = jwt.sign({ id: user._id }, secretkey);
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ message: "Authentication successful.", data: user, statusCode: 200 });
  } catch (error) {
    console.error("Signin error:", error);
    res
      .status(500)
      .json({
        message: "Server encountered an error, please try again later",
        error: error,
        statusCode: 500
      });
  }
};


// login
const authenticate = async (req, res, next) => {
  if(!req.headers.authorization) {
    return res.status(401).json({ message: 'Auth token not found', statusCode: 401 });
  }
  
  const token = req.headers.authorization.split(' ')[1];

  try {
    const decodeValue = await admin.auth().verifyIdToken(token);
    if(decodeValue) {
      await checkAndResgisterUser(decodeValue);
      req.firebaseUser = decodeValue;
      return next();
    }
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized, token expired', error: error, statusCode: 401 });
  }
  
}

const checkAndResgisterUser = async (user) => {
  console.log('checking if user exists');
  console.log(user);

  const foundUser = await User.findOne({ user_id: user.uid });
  if(foundUser != null) return;
  console.log('creating new user');

  const newUser = await User.create({
    user_id: user.uid,
    email: user.email,
  })
}












module.exports = { signup, signin, authenticate };
