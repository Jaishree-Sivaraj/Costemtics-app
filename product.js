//const mongoose=require('mongoose')
import mongoose from "mongoose"
const Schema=mongoose.Schema

const productSchema=new Schema({
    name:{
    type:String,
    required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    isAvailable:{
        type:String,
        required:true
    },
    ratings:{
        type:Number,
        required:true
    }

})
const Product=mongoose.model('Product',productSchema)


export default Product

