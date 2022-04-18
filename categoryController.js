import Category from '../model/category.js'

//get /getCategory
export const listCategory=async(req,res)=>{
    try{
        const results=await Category.find({})
        res.json(results);
    }catch(error){
        console.error(error);
        res.status(500).json({message:error.message})
    }
}
//post /createCategory
export const createCategory=async(req,res)=>{
    try{
        const doc=await Category.create(req.body);
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

//delete /deleteCategory/:id
export const destroyCategory=async(req,res)=>{
    try{
        const results=await Category.findByIdAndDelete(req.params.id)
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
//get /populateCategory
export const populateCategory=async(req,res)=>{
    await Category.find()
    .populate({
        path:'description',
        select:['username','email','mobile']
    })
    .populate({
        path:'name',
        select:'price'
    })
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
            message:error.message? error.message:"failed to retreive"
        })
    })

}
//get /lookups
export const lookup=async(req,res)=>{
    try{
       const results=await Category.aggregate([
                  {
                      $lookup:
                      {
                          from:'products',
                          localField:'name',
                          foreignField:'name',
                          as:"product_docs"
                      }
                  }
              ])
              res.json(results);
          }catch(error){
              console.error(error);
              res.status(500).json({message:error.message})
          }
      }
      