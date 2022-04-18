//const mongoose=require('mongoose')
import mongoose from "mongoose"
const Schema=mongoose.Schema
const orderSchema=new Schema({
  username:{
    type:String,
    required:true,
  },
  email:{
    type:String,
    required:true,
  },
  address:[{
      city:{
        type:String,
        required:true
      },
      state:{
        type:String,
        required:true
      },
      zipcode:{
        type:Number,
        required:true
    },
  }],
  mobile:{
    type:Number,
    required:true,
    unique:true
  }
//   productName:{
//      type:String,
//      required:true
//   },
//   size:{
//      type:String,
//      required:true
//   },
//   color:{
//     type:String,
//     required:true
//   },
//   discount:{
// type:String,
// required:true
//   }
  

})
const Order=mongoose.model('Order',orderSchema)

export default Order