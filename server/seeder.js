const mongoose = require('mongoose')
const dotenv = require('dotenv')
const users = require('./data/users')
const User = require('./models/userModel')
const connectDB = require('./config/dbtest')

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await User.deleteMany()
    await User.insertMany(users)
    console.log('##### Data Imported!')
    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await User.deleteMany()
    console.log('##### Data Destroyed!')
    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
