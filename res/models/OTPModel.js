const mongoose = require('mongoose');

const OTPSchema = mongoose.Schema({
    email:{type: String, required: true},
    otp:{type: Number, required: true},
    status:{type: String, required: true}
},{timestamps: true, versionkey: false})

const OTPModel = mongoose.model('OTP',OTPSchema);

module.exports = OTPModel;