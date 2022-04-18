import express from "express";
import cors from 'cors'
import passport from 'passport'
import session from "express-session";
import mongoose from './app/config/database.js'
import router from './app/config/routes.js'
//import './app/model/passport.js'
//import './app/model/user.js'
//import './app/controller/passportController.js'
import './app/config/passport.js'
const app=express()

const port=9010

app.use(express.json())
app.use('/',router)
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(passport.initialize());
//app.use(passport.session())

//app.use(session({secret:'melody animal'}))






app.listen(port,()=>{
    console.log(`listening on port,${port}`)
})