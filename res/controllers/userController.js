const UserModel = require('../models/userModel');
const JWT = require('jsonwebtoken');


exports.register = async (req, res) => {
    try {
        const userData = req.body;
        if(userData == null){
            return res.json({status : 'error', data : 'User data is required'});
        }
        await UserModel.create(userData);
        res.json({status : 'success', data : 'User created successfully'});
        
    } catch (error) {
        res.json({status : 'error', data : error.message});
    }
}


exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;

        if(email == null) {
            return res.json({status : 'error', data : 'Email is required'});
        }else if(password == null){
            return res.json({status : 'error', data : 'Password is required'});
        }

        const user = await UserModel.findOne({email: email, password: password})
        if(!user){
            return res.json({status : 'error', data : 'Invalid credentials'});
        }

        let playload = { expiresIn: 3600, email: email}
        let token = JWT.sign(playload,'binMohammad');
        res.json({status : 'success', data : 'User logged in successfully', token: token});
        
    } catch (error) {
        res.json({status : 'error', data : error.message});
    }
}