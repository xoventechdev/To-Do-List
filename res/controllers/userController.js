const UserModel = require('../models/userModel');


exports.register = async (req, res) => {
    try {
        const userData = req.body;
        await UserModel.create(userData);
        res.json({status : 'success', data : 'User created successfully'});
        
    } catch (error) {
        res.json({status : 'error', data : error.message});
    }
}