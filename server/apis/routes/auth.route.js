const express = require('express')
const jwt = require('jsonwebtoken');
const authControllers = require('../controllers/auth.controller.js')

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

router.post('/register', authControllers.register)
router.post('/login', authControllers.login)
router.get('/get-profile/:userId', loggedIn, authControllers.profile)
router.patch('/update-profile/:userId', loggedIn, authControllers.update)

module.exports = router