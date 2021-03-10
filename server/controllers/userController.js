const asyncHandler = require('express-async-handler')
const generateToken = require('../config/generateToken')
const User = require('../models/userModel')



// @desc    Register a new user
// @route   POST /api/users/signup
// @access  Public
const signUp = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  const userAlreadyRegistered = await User.findOne({ email })

  if(userAlreadyRegistered) {
    res.status(404).json({message: 'User already exists'})
  }

  const user = await User.create({
    name,
    email,
    password,
  })

  if(user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(400).json('Invalid user data')
  }
})




// @desc    Auth user & get token
// @route   POST /api/users/signin
// @access  Public
const signIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if(user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(401).json({message: 'Invalid email or password'})
  }
})




// @desc    Get all users
// @route   GET /api/users/allusers
// @access  Public ///// TO BE DELETED !!!
const allUsers = asyncHandler(async (req, res) => {

  const users = await User.find({})

  if(users) {
    res.json(users)
  } else {
    res.status(401).json({message: 'No users in DB !'})
  }
})





// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})





module.exports = { signUp, signIn, allUsers, getUserProfile }