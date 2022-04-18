import mongoose from "mongoose"
const Schema=mongoose.Schema
const CategorySchema=new Schema({
    name:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Product'

    },
    description:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Order'

        
    },
    createdAt: {
        type: Date,
        required:true
    }

    
})
const Category=mongoose.model("Category", CategorySchema)

export default Category