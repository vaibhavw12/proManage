const authModel = require('../models/auth.models.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const register = async (req, res, next)=>{
    const {name, email, password} = req.body
    const hashedPassword = bcrypt.hashSync(password, 12)
    try{
        await authModel.create({name, email, password : hashedPassword})
        res.json({
            status : 'SUCCESS',
            message : 'user register successfully',
            credentials : req.body
        })
    }catch(err){
        res.json({
            status : 'FAILED',
            message : err.message
        })
        console.log(err)
    }
}

const login = async (req, res)=>{
    const {email, password} = req.body
    try{
        const currentUser = await authModel.findOne({email})
        if(currentUser){
            const decryptPassword = bcrypt.compareSync(password, currentUser.password)
            if(decryptPassword){
                const jwtToken = jwt.sign({email},process.env.PRIVATEKEY,{expiresIn : 60*60*60})
                res.json({
                    status : 'SUCCESS',
                    name : currentUser.name,
                    message : 'login successfull',
                    token : jwtToken,
                    id : currentUser._id
                })
            }else{
                res.json({
                    status : 'FAILED',
                    message : 'email and password does not matched'
                })
            }
        }else{
            res.json({
                status : 'FAILED',
                message : 'user not found with this email'
            })
        }
    }catch(err){
        console.log(err)
        res.json({
            status : 'FAILED',
            message : err.message
        })
    }
}

module.exports = {
    register,
    login
};