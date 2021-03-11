const express = require('express')
const router = express.Router()
const { signUp,
        signIn, 
        allUsers, 
        getUserProfile } = require('../controllers/userController')
const protect = require('../middlewares/authMiddleware')


router.post('/auth/signin', signIn)
router.post('/auth/signup', signUp)
router.get('/allusers', allUsers) // For testing purposes - To be deleted in Production
router.route('/profile').get(protect, getUserProfile)


module.exports = router
