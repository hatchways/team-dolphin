const express = require('express')
const router = express.Router()
const { signIn, 
        allUsers, 
        getUserProfile } = require('../controllers/userController')
const protect = require('../middlewares/authMiddleware')


router.post('/signin', signIn)
router.get('/allusers', allUsers)
router.route('/profile').get(protect, getUserProfile)


module.exports = router
