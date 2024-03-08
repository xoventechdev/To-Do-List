const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();


router.post('/register', userController.register);

















router.get('*', function(req, res){
    res.send('Not found - 404')
})


module.exports = router;