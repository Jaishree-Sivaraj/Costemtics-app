 import Cart from '../model/cart.js'

 //get listCart
export const listCart=async(req,res)=>{
    try{
        const results=await Cart.find({})
        res.json(results);
    }catch(error){
        console.error(error);
        res.status(500).json({message:error.message})
    }
}
//post createCart
export const createCart=async(req,res)=>{
    try{
        const doc=await Cart.create(req.body);
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
//put updateCartItem carts/:id
export const updateCartItem=async(req,res)=>{
    try{
        const results=await Cart.findByIdAndUpdate(req.params.id,req.body,{new:true})
        .populate('productId')
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
//delete destroyCart /carts/:id
export const destroyCart=async(req,res)=>{
    try{
        const results=await Cart.findByIdAndDelete(req.params.id)
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
//get /populateCart
export const populateCart=async(req,res)=>{
    // try{
    //     const results=await Cart.find()
    //     .populate('productId')
    //     res.json(results);
    // }catch(error){
    //     console.error(error);
    //     res.status(500).json({message:error.message})
    // }

    await Cart.find()
    .populate('product')
    .then((results)=>{
        return res.status(200).json({
            status:"200",
            message:'retreived the data',
            data:results
        })
    })
    .catch((error)=>{
        return res.status(500).json({
            status:"500",
            message:"failed to retreive"
        })
    })

}

