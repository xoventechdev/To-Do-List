const SendEmail = require('../helper/sendEmail');
const OTPModel = require('../models/OTPModel');
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

exports.profileRead = async (req, res) => {
    try {
        const email = req.headers.email;
        const userInfo = await UserModel.findOne({email: email}, {password: 0, createdAt: 0, updatedAt: 0})
        res.json({status : 'success', data : userInfo});
    } catch (error) {
        res.json({status: 'error', data : error.message});
    }
}


exports.profileUpdate = async (req, res) => {
    try {
        const email = req.headers.email;
        const userData = req.body;
        if(userData == null){
            return res.json({status: 'error', data: 'UserData ir required'})
        }
        await UserModel.findOneAndUpdate({email: email}, userData)
        res.json({status: 'success', data: 'User Profile is updated successfully'})
    } catch (error) {
        res.json({status: 'error', data: error.message});
    }
}


exports.verifyRequest = async (req, res) => {
    try {
        const {email}=req.params;
        let user = await UserModel.find({email: email});
        if(user.length < 1){
            return res.json({status: 'error', data: `User not found ${email}`});
        }else {
            const otp = Math.floor(100*Math.random() *9000)
            await SendEmail(email,`Your OTP is ${otp} for email verification`, 'Email verification')
            await OTPModel.create({email: email, otp: otp, status: 'Unverified'});
            res.json({status:'success', data: `OTP sent to ${email} successfully`});
        }
    } catch (error) {
        res.json({status: 'error', data: error.message});
    }
}


exports.verifyOTP = async (req, res) => {
    try {
        const {email, otp} =req.params;
        let user = await OTPModel.find({email: email, otp: otp, status: 'Unverified'});
        if(user.length < 1){
            return res.json({status: 'error', data: `OTP not found for ${email}`});
        }else {
            await OTPModel.findOneAndUpdate({email: email, otp: otp}, {status: 'Verified'});
            await UserModel.findOneAndUpdate({email: email}, {verify: true});
            await SendEmail(email,`You have successfully verified your email address`, 'Email verification successfully')
            res.json({status:'success', data: `OTP verified successfully`});
        }
    } catch (error) {
        res.json({status: 'error', data:error.message});
    }
}


exports.passwordReset = async (req, res) => {
    try {
        const {email, otp, password} = req.params;
        let user = await OTPModel.find({email: email, otp: otp, status: 'Verified'});
        if(user.length > 0) {
            await UserModel.findOneAndUpdate({email: email}, {password: password});
            await OTPModel.findOneAndDelete({email: email, otp: otp});
            await SendEmail(email,`You have successfully reset your password.`, 'Password reset successfully')
            return res.json({status:'success', data: `Password reset successfully`});
        }else{
            return res.json({status: 'error', data: `OTP not found for ${email}. Please request for OTP first.`});
        }
        
    } catch (error) {
        res.json({status: 'error', data: error.message});
    }
}