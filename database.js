import mongoose from 'mongoose'
mongoose.connect('mongodb://localhost:27017/cosmetics-app',{useNewUrlParser:true})

.then(()=>{
    console.log('sucessfully connected to db')
})

.catch((err)=>{
    console.log('error connecting to db',err)
})

export default mongoose