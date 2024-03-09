const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    mobile: {type: Number, unique: true, required: true},
    password: {type: String, required: true},
    verify: {type: Boolean, default: false}
},{timestamps: true, versionKey: false})

const UserModel = mongoose.model('users',UserSchema);

module.exports = UserModel;