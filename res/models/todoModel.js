const mongoose = require('mongoose');

const TODOSchema = mongoose.Schema({
    user: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    status: {type: String, default: 'TO DO'}
},{timestamps: true, versionKey: false})

const TODOModel = mongoose.model('tasks', TODOSchema)

module.exports = TODOModel;