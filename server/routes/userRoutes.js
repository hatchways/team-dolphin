const express = require('express')
const router = express.Router()
const { signUp,
        signIn, 
        allUsers, 
        getUserProfile } = require('../controllers/userController')
const protect = require('../middlewares/authMiddleware')


router.route('/signup').post(signUp)
router.post('/signin', signIn)
router.get('/allusers', allUsers)
router.route('/profile').get(protect, getUserProfile)


module.exports = router
