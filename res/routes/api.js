const express = require('express');
const userController = require('../controllers/userController');
const { userAuth } = require('../middleware/authMiddleware');
const todoController = require('../controllers/todoController');
const router = express.Router();

// User Register & login
router.post('/register', userController.register);
router.post('/login', userController.login);

// User verification & password reset
router.post('/verify-request/:email', userController.verifyRequest);
router.post('/verify-otp/:email/:otp', userController.verifyOTP);
router.put('/password-reset/:email/:otp/:password', userController.passwordReset);

// User profile update & read
router.get('/profile-read', userAuth, userController.profileRead);
router.put('/profile-update', userAuth, userController.profileUpdate);

// Task list Creation & update
router.post('/create-task', userAuth, todoController.createTask)
router.get('/read-task', userAuth, todoController.readTask)
router.put('/update-task/:id', userAuth, todoController.updateTask)
router.delete('/delete-task/:id', userAuth, todoController.deleteTask)



router.get('*', function(req, res){
    res.send('Not found - 404')
})

module.exports = router;