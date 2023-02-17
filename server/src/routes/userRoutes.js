const router = require('express').Router();
const { signupController,loginController } = require('../controllers/auth.controller')

//user registration
router.post('/signup', signupController)

//user login
router.post('/login', loginController)


module.exports = router;