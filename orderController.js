import nodemailer from "nodemailer"
import Order from '../model/order.js'

//listOrder//getmethod
export const listOder=async(req,res)=>{
    try{
        const results=await Order.find({})
        res.json(results);
    }catch(error){
        console.error(error);
        res.status(500).json({message:error.message})
    }
}

//createOrder//getmethod
export const createOrder=async(req,res)=>{
    try{
        const doc=await Order.create(req.body);
        return res.status(200).json({
            status:"200",
            message:'Created new Product Details successfully',
            data:doc
        })
    }catch(error){
        console.error(error);
        res.status(500).json({message:error.message})
    }    
}

//updateOrder //getmethod
export const updateOrder=async(req,res)=>{
    try{
        const results=await Order.findByIdAndUpdate(req.params.id,req.body,{new:true})
        return res.status(200).json({
            status:"200",
            message:'Updated new Product Details successfully',
            data:results
        })
    }catch(error){
        console.error(error);
        res.status(500).json({message:error.message})
    }
}
//destroyOrder //getmethod
export const destroyOrder=async(req,res)=>{
    try{
        const results=await Order.findByIdAndDelete(req.params.id)
        return res.status(200).json({
            status:"200",
            message:'Deleted new Product Details successfully',
            data:results
        })
        
    }catch(error){
        console.error(error);
        res.status(500).json({message:'Failed to Delete Product Detail'})
    }
}

//unwind //getmethod
export const unwind=async(req,res)=>{
    try{
        const results=await Order.aggregate([
           {$unwind:"$address"}
        ])
        res.json(results);
    }catch(error){
        console.error(error);
        res.status(500).json({message:error.message})
    }

}
//getResultsById //getmethod
export const getResultsById=async(req,res)=>{
    try{
        const results=await Order.find(req.body);
        return res.status(200).json({
            status:"200",
            message:'The results received successfully',
            data:results
        })
    }catch(error){
        console.error(error);
        res.status(500).json({message:error.message})
    }    

}
//get /getArrayResults/:id
export const getArrayResults=async(req,res)=>{
    try{
        let value=req.body.city
        const results=await Order.findById(req.params.id,{"address.city":value});
        return res.status(200).json({
            status:"200",
            message:'The results received successfully',
            data:results
        })
    }catch(error){
        console.error(error);
        res.status(500).json({message:error.message})
    }    

}
//getVerifiedMessage //getmethod
export const getVerifiedMessage=async(req,res)=>{
    let transporter=await nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:"jaishrees973@gmail.com",
            pass:"Jaishree15@"
        },
        tls:{
            rejectUnauthorized:false
        }
    })
    
    let mailOptions={
        from:"jaishrees973@gmail.com",
        to:"thaish649@gmail.com",
        subject:"Your order #418667836261 with BHARAT INTERNATIONAL is booked",
        text:"Flipkart,\n Order 8736878787667 \n 7:45 thursday 20,2022 \n (This is an order Confirmation), \nOrder Details, \nSupplier:BHARAT INTERNATIONAL, \nPayment Mode:COD",
        attachments:[
            {__filename:'image1.JPG',path:'./public/image1.JPG'},
            {__filename:'IndiumPresentation.pdf',path:'./public/IndiumPresentation.pdf'}

        ]

    }
    
    transporter
    .sendMail(mailOptions)
    .then((transporter)=>{
        return res.status(200).json({
            status:"200",
            message:'email sent',
            data:transporter
        })
    })
    .catch((error)=>{
        return res.status(500).json({
            status:"500",
            message:error.message? error.message:"failed to retreive"
        })
    })
    
}


