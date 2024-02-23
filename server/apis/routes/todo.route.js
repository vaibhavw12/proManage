const express = require('express')
const jwt = require('jsonwebtoken');
const toDoControllers = require('../controllers/todo.controller.js')

const router = express.Router()

const loggedIn = (req, res, next)=>{
    try{
        const {jwttoken} = req.headers
        const user = jwt.verify(jwttoken, process.env.PRIVATEKEY)
        // console.log(user)
        next(); 
    }catch(err){
        console.log(err.message)
    }
}

router.post('/createtodo',loggedIn, toDoControllers.createToDo)

module.exports = router