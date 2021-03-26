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
      companies: [name],
      activeCompany: name, // will be the company signed up with by default -- can be changed in settings and navbar
      email,
      reportEmail: email, // by default -- can be changed in settings
      password,
    });

    if (user) {
      const token = generateToken(user._id);
      res.cookie("dolphinToken", token, {
        maxAge: 3600000,
        httpOnly: true,
        secure: false, // should be true in Production !
      });

      res.status(201).json({
        _id: user._id,
        companies: user.companies,
        activeCompany: user.activeCompany,
        email: user.email,
        reportEmail: user.reportEmail,
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

    res.status(201).json({
      _id: user._id,
      companies: user.companies,
      activeCompany: user.activeCompany,
      email: user.email,
      reportEmail: user.reportEmail,
      platforms: user.platforms,
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};

// @desc    Clears user cookie
// @route   GET /api/users/logout
// @access  Public
const logout = async (req, res) => {
  res.clearCookie("dolphinToken");
  res.sendStatus(200);
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
  res.json(req.user);
};

// @desc    Update user's selected platforms
// @route   PATCH /api/users/platforms
// @access  Private
const updatePlatforms = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user._id, {
    platforms: req.body,
  });

  res.json(user);
};

// @desc    Update user's weekly report email
// @route   PATCH /api/users/settings
// @access  Private
const updateReportEmail = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user._id, {
    reportEmail: req.body.updatedEmail,
  });

  res.json(user);
};

// @desc    Update user's companies
// @route   PATCH /api/users/platforms
// @access  Private
const updateCompanies = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, {
      companies: req.body.companies,
    });

    res.json(user);
  } catch (error) {
    throw error;
  }
};

const updateActiveCompany = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, {
      activeCompany: req.body.updatedCompany,
    });

    res.json(user);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  signUp,
  signIn,
  getUserProfile,
  updatePlatforms,
  updateReportEmail,
  updateCompanies,
  updateActiveCompany,
  logout,
};
