const asyncHandler = require("express-async-handler");
const generateToken = require("../config/generateToken");
const User = require("../models/userModel");

// @desc    Register a new user
// @route   POST /api/users/auth/signup
// @access  Public
const signUp = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userAlreadyRegistered = await User.findOne({ email });

  if (userAlreadyRegistered) {
    res.status(400).json({ message: "User already exists" });
  }

  const regex = /\w{6,}/gm;
  const validPassword = regex.test(password);

  if (validPassword) {
    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      const token = generateToken(user._id);
      res.cookie("dolphinToken", token, {
        maxAge: 600000,
        sameSite: "none",
        httpOnly: true,
        secure: false, // should be true in Production !
      });
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } else {
    res.status(400).json({ message: "Invalid password" });
  }
});

// @desc    Auth user & get token
// @route   POST /api/users/auth/signin
// @access  Public
const signIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user._id);
    res.cookie("dolphinToken", token, {
      maxAge: 600000,
      httpOnly: true,
      secure: false, // should be true in Production !
    });
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = { signUp, signIn, getUserProfile };
