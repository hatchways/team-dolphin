const generateToken = require("../config/generateToken");
const User = require("../models/userModel");
const { addMentionsToDB } = require("../utils/scraper"); // Added for Co-op Midterm Presentation

// @desc    Register a new user
// @route   POST /api/users/auth/signup
// @access  Public
const signUp = async (req, res) => {
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
        maxAge: 3600000,
        httpOnly: true,
        secure: false, // should be true in Production !
      });

      // Added for Co-op Midterm Presentation
      // To be handled later on by BullMQ
      await addMentionsToDB(user.name);

      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        platforms: user.platforms,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } else {
    res.status(400).json({ message: "Invalid password" });
  }
};

// @desc    Auth user & get token
// @route   POST /api/users/auth/signin
// @access  Public
const signIn = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user._id);
    res.cookie("dolphinToken", token, {
      maxAge: 3600000,
      httpOnly: true,
      secure: false, // should be true in Production !
    });

    // Added for Co-op Midterm Presentation
    // To be handled later on by BullMQ
    await addMentionsToDB(user.name);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      platforms: user.platforms,
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
  res.json(req.user);
};

// @desc Update user's selected platforms
// @route PATCH /api/users/platforms
// @access Private
const updatePlatforms = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user._id, {
    platforms: req.body,
  });

  res.json(user);
};

module.exports = { signUp, signIn, getUserProfile, updatePlatforms };
