const express = require('express')
const jwt = require('jsonwebtoken');
const toDoControllers = require('../controllers/todo.controller.js')

const router = express.Router()

const loggedIn = (req, res, next)=>{
    try{
        const {jwttoken} = req.headers
        jwt.verify(jwttoken, process.env.PRIVATEKEY)
        next(); 
    }catch(err){
        console.log(err.message)
    }
}

router.post('/createtodo',loggedIn, toDoControllers.createToDo)
router.get('/:section/todos', loggedIn, toDoControllers.getTodosBySection);
router.patch('/update-checklist/:todoId', loggedIn, toDoControllers.updateChecklist)
router.patch('/update-section/:todoId', loggedIn, toDoControllers.updateSection)
router.delete('/delete-todo/:todoId', loggedIn, toDoControllers.deleteToDo)
router.get('/get-todo/:todoId', toDoControllers.shareToDo) // public api
router.patch('/update-todo/:todoId',loggedIn, toDoControllers.updateToDo)
router.get('/analytics/:userId',loggedIn, toDoControllers.getAnalytics)

module.exports = router