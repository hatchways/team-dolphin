const generateToken = require("../config/generateToken");
const User = require("../models/userModel");
const { addMentionsToDB } = require("../utils/scraper"); // Added for Co-op Midterm Presentation
const { sendWeeklyReport } = require("../utils/mailjet");
const { handleIndividualCompany } = require("../utils/jobHandler");

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
      handleIndividualCompany(user.activeCompany);
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

// @desc    Update property/properties of User
// @route   PATCH /api/users/update
// @access  Private
const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: req.body },
      { new: true }
    );
    console.log(user);
    res.json(user);
  } catch (error) {
    throw error;
  }
};

// @desc    Send user's weekly report email -- DEMO PURPOSES ONLY
// @route   GET /api/users/sendReport
// @access  Private
const sendReport = async (req, res) => {
  const topMentions = await req.user.getTopFiveMentions();
  sendWeeklyReport(req.user.reportEmail, topMentions);
  res.sendStatus(200);
};

module.exports = {
  signUp,
  signIn,
  getUserProfile,
  updateUser,
  logout,
  sendReport,
};
