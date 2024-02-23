const todoModel = require('../models/todo.models.js')
const authModel = require('../models/auth.models.js')
const dotenv = require('dotenv')
dotenv.config()

const createToDo = async (req, res, next)=>{
    const todoObj = req.body
    try{
        const todo = await todoModel.create(todoObj)
        const currentUser = await authModel.findById(_id = todo.createdBy)
        currentUser.createdToDos.push(todo._id)
        await authModel.findByIdAndUpdate(currentUser._id,currentUser)
        res.json({
            status : 'SUCCESS',
            message : 'to do created successfully',
            id : todo._id
        })
    }catch(err){
        res.json({
            status : 'FAILED',
            message : err.message
        })
        console.log(err.message)
    }
}

module.exports = {
    createToDo,
};