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

module.exports = router