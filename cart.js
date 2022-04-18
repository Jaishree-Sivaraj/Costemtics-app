import mongoose from "mongoose"
const Schema=mongoose.Schema
const cartSchema=new Schema({
    userId:{
        type:Number,
        required:true,
        
    },
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Product'
    },
    quantity:{
        type:Number,
        required:true,
    },

})
const Cart=mongoose.model('Cart',cartSchema)

export default Cart