const TODOModel = require("../models/todoModel");

// 4 type of status for task
// TO DO
// IN PROGRESS
// DONE
// COMPLETE
// CANCELLED

exports.createTask = async (req, res) => {
    try {
        const tasksData = req.body;
        if(tasksData == null) {
            return res.json({status : 'error', data : 'Task data is required'});
        }else{
            await TODOModel.create({user: req.headers.email, title: tasksData.title, description: tasksData.description})
            res.json({status :'success', data : 'Task created successfully'});
        }
    } catch (error) {
        res.json({status: 'error', data: error.message});
    }

}

exports.readTask = async (req, res) => {
    try {
        const tasks = await TODOModel.find({user: req.headers.email})
        res.json({status :'success', data : tasks});
    } catch (error) {
        res.json({status: 'error', data: error.message});
    }
}


exports.updateTask = async (req, res) => {
    try {
        const tasksData = req.body;
        if(tasksData == null) {
            return res.json({status : 'error', data : 'Task ID is required'});
        }else{
            await TODOModel.findOneAndUpdate({_id: req.params.id, user: req.headers.email}, tasksData)
            res.json({status :'success', data : 'Task updated successfully'});
        }
        
    } catch (error) {
        res.json({status: 'error', data: error.message});
    }
}


exports.deleteTask = async (req, res) => {
    try {
        await TODOModel.findOneAndDelete({_id: req.params.id, user: req.headers.email});
        res.json({status :'success', data : 'Task deleted successfully'});
    } catch (error) {
        res.json({status: 'error', data: error.message});
    }
}