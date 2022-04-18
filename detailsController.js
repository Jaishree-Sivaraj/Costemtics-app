import Details from '../model/details.js'

//localhost:9010/getDetails
export const listDetails=async(req,res)=>{
    try{
        const results=await Details.find({})
        res.json(results);
    }catch(error){
        console.error(error);
        res.status(500).json({message:error.message})
    }
}
//localhost:9010/createDetails
export const createDetails=async(req,res)=>{
    try{
        const doc=await Details.create(req.body);
        return res.status(200).json({
            status:"200",
            message:'Created new Details successfully',
            data:doc
        })
    }catch(error){
        console.error(error);
        res.status(500).json({message:error.message})
    }    
}
//localhost:9010/deleteDetails/:id
export const destroyDetails=async(req,res)=>{
    try{
        const results=await Details.findByIdAndDelete(req.params.id)
        return res.status(200).json({
            status:"200",
            message:'Deleted new Details successfully',
            data:results
        })
        
    }catch(error){
        console.error(error);
        res.status(500).json({message:'Failed to Delete Detail'})
    }
}
//localhost:9010/getFilteredDetails
export const getFilteredDetails=async(req,res,next)=>{
         await Details.find()
        .then((Details)=>{
        let getList=[]
        for(let i=0; i<Details.length; i++){
            if(Details[i].Cost>500){
                let object={
                    Color: Details[i].Color,
                    Size:Details[i].Size,
                    Cost:Details[i].Cost
                }
                getList.push(object)
            }
                     
        }
        return res.status(200).json({
            status:"200",
            message:'Fetched the data',
            count:getList.length,
            data:getList
        })
    })
        .catch(next)
    }    

    

   

