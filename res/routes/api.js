const express = require('express');
const userController = require('../controllers/userController');
const { userAuth } = require('../middleware/authMiddleware');
const router = express.Router();


router.post('/register', userController.register);
router.post('/login', userController.login);

router.post('/verify-request/:email', userController.verifyRequest);
router.post('/verify-otp/:email/:otp', userController.verifyOTP);
router.put('/password-reset/:email/:otp/:password', userController.passwordReset);

router.get('/profile-read', userAuth, userController.profileRead);
router.put('/profile-update', userAuth, userController.profileUpdate);


















router.get('*', function(req, res){
    res.send('Not found - 404')
})


module.exports = router;