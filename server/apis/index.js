const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const cors = require('cors')

dotenv.config()
const app = express()
app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())
app.use(cors())

const port = process.env.PORT || 5000;

const authRoutes = require('./routes/auth.route.js')
app.use('/api/auth', authRoutes)

app.get('/check',(req, res)=>{
    res.json({
        status : 'SUCCESS',
        message : 'server is up and running'
    })
})

app.listen(port, () => {
    try{
        mongoose.connect(process.env.MONGO_URL)
        .then(()=>{
            console.log(`server is up and running on port : ${port} 🔥 and DB successfully connected`)
        }).catch((err)=>{
            console.log(err)
        })
    }catch(err){
        console.log(err)
    }
});