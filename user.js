import mongoose from "mongoose"
//import {hashSync} from 'bcrypt'
const Schema=mongoose.Schema
const userSchema=new Schema({
    username:{
        type:String,
        required:true,
        
    },
    password:{
        type: String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    }

})
const User=mongoose.model('User',userSchema)

export default User