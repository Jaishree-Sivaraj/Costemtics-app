import mongoose from "mongoose"
const Schema=mongoose.Schema
const detailsSchema=new Schema({
    Cost:{
        type:Number,
        required:true,
        
    },
    Size:{
        type:Number,
        required:true,
    },
    Color:{
        type:String,
        required:true,
    },

})
const Details=mongoose.model('Details',detailsSchema)

export default Details