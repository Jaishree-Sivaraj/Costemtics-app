import Product from '../model/product.js'


//get /products
export const listProducts=async(req,res)=>{
    try{
        const results=await Product.find()
        res.json(results);
    }catch(error){
        console.error(error);
        res.status(500).json({message:error.message})
    }

}

//post /products
export const createProducts=async(req,res)=>{
    try{
        const doc=await Product.create(req.body);
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

//put /products/:id
export const updateProducts=async(req,res)=>{
        try{
            const results=await Product.findByIdAndUpdate(req.params.id,req.body,{new:false});
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


//delete /products/:id
export const destroyProducts=async(req,res)=>{
    try{
        const results=await Product.findByIdAndDelete(req.params.id)
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


//get /or
export const getTwoProducts=async(req,res)=>{
    try{
        let nameValue=req.body.name
        let descriptionValue=req.body.description
        const results=await Product.find({$or:[{name:nameValue},{description:descriptionValue}]})
        res.json(results);
    }catch(error){
        console.error(error);
        res.status(500).json({message:error.message})
    }

}

//get /and
export const getAndProducts=async(req,res)=>{
    try{
        let nameValue=req.body.name
        let descriptionValue=req.body.description
        const results=await Product.find({$and:[{name:nameValue},{description:descriptionValue}]})
        res.json(results);
    }catch(error){
        console.error(error);
        res.status(500).json({message:error.message})
    }

}
//get /matchAndGroup
export const matchandGroup=async(req,res)=>{
    try{
        let name=req.body.name
        const results=await Product.aggregate([
            {$match:{name:name}},
            {$group:{_id:{price:"$price",description:"$description"}}},
            
        ])
        res.json(results);
    }catch(error){
        console.error(error);
        res.status(500).json({message:error.message})
    }

}
//get /sort
export const getSortedProducts=async(req,res)=>{
    try{
        const results=await Product.aggregate([
            {$sort:{name:1}}
        ])
        res.json(results);
    }catch(error){
        console.error(error);
        res.status(500).json({message:error.message})
    }

}
//get /project
export const project=async(req,res)=>{
    try{
        const results=await Product.aggregate([
            {$limit:5},
            {$project:{
                _id:0,
                name:1,
                info:{
                    price:"$price",
                    ratings:"$ratings"
                }
            }}
        ])
        res.json(results);
    }catch(error){
        console.error(error);
        res.status(500).json({message:error.message})
    }

}

//get /countProducts
export const countProducts=async(req,res)=>{
    try{
        const results=await Product.aggregate([
           {$count:"allDocumentsCount"}
        ])
        res.json(results);
    }catch(error){
        console.error(error);
        res.status(500).json({message:error.message})
    }

}

//get /groupandCount
export const groupandCount=async(req,res)=>{
    try{
        const results=await Product.aggregate([
            {$group:{_id:{price:"$price",rating:"$ratings"}}},
           {$count:"priceAndratings"}
        ])
        res.json(results);
    }catch(error){
        console.error(error);
        res.status(500).json({message:error.message})
    }
}

//get /inProducts
export const inProducts=async(req,res)=>{
    try{
        let value=req.body.price
        const results=await Product.find(
            { price: { "$in":[value] } }
        )
        res.json(results);
    }catch(error){
        console.error(error);
        res.status(500).json({message:error.message})
    }

}
//get /ninProducts
export const ninProducts=async(req,res)=>{
    try{
        let value=req.body.price
        const results=await Product.find(
            { price: { "$nin":[value] } }
        )
        res.json(results);
    }catch(error){
        console.error(error);
        res.status(500).json({message:error.message})
    }

}
//get /equal
export const equal=async(req,res)=>{
    try{
        let value=req.body.name
        const results=await Product.find(
            { name: { "$eq":value } }
        )
        res.json(results);
    }catch(error){
        console.error(error);
        res.status(500).json({message:error.message})
    }

}
//get /pagefirstName
export const pagefirstName = async (req, res) => {
    let { page, limit } = req.query
    await Product.find().limit(limit * 1)
    .skip((page - 1) * limit)
    .then((products) => {
    return res.status(200).json({
    status: "200",
    message: 'retrieved Data',
    data: products
    })
    })
    .catch((err) => {
    return res.status(500).json({
    message: err.message ? err.message : 'failed to retrieve Data'
    })
    })
    }
//get /getResults
export const getResults=async(req,res)=>{
    try{
        let value=req.body.ratings
        const results=await Product.aggregate([
            { $match:{ratings:value} },
            {$group:{_id:{name:"$name",description:"$description"}}},
            {$limit:5},
            
            
        ])
        res.json(results);
    }catch(error){
        console.error(error);
        res.status(500).json({message:error.message})
    }

}
//getPipeline//get method
export const getPipeline=async(req,res)=>{
    try{
        
        const results=await Product.aggregate([
       {$group:{_id:{name:"$name"}}},
       {$sort:{_id:1}}
            
            
        ])
        res.json(results);
    }catch(error){
        console.error(error);
        res.status(500).json({message:error.message})
    }

}
//get /search/:name/:description
export const searchProducts=async(req,res)=>{
    const name=new RegExp(req.params.name)
   const value=new RegExp(req.params.description)
    await Product.find({
        "$or":[
            {"name":{$regex:name,'$options': 'i'}},
            {"description":{$regex:value,'$options': 'i'}}
        ]
        
    },{price:0,ratings:0,isAvailable:0,_id:0})
    .then((results)=>{
        return res.status(200).json({
            status:"200",
            message:'retreived the data',
            data:results
        })
    })
    .catch((error)=>{
        console.log(error)
     })
}

//get /filteredObjects
export const filteredObjects=async(req,res)=>{
    try{
        let name=req.params.name
        const results=await Product.find({name:name},{isAvailable:0,price:0,description:0})
        res.json(results);
    }catch(error){
        console.error(error);
        res.status(500).json({message:error.message})
    }

}
//get /greaterValue /query
export const getGreaterValue =async(req,res)=>{
    try{
        let value=req.query.price
        let name=req.query.name
        const results=await Product.find({"price":{"$gte":value}},{isAvailable:0,description:0,ratings:0})
        res.json(results);
    }catch(error){
        console.error(error);
        res.status(500).json({message:error.message})
    }

}