import User from '../model/user.js'
import {hashSync,compareSync} from 'bcrypt'
import jwt from 'jsonwebtoken'
import passport from 'passport'

// export const getUserLogin=async(req,res)=>{
//         try{
//             let username=req.body.username
//             let password=hashSync(req.body.password,10)
            
//             const user=await User.create({username,password,amount});
//             return res.status(200).json({
//                 success:true,
//                 message:'User created successfully',
//                 user:{
//                      id:user._id,
//                      username:user.username,
//                      amount:user.amount
//                 }
//             })
//         }catch(error){
//             console.error(error);
//             res.status(500).json({message:error.message})
//         }    
//     }
    
export const getLoginDetails=async(req,res)=>{
  User.findOne({username:req.body.username})
  .then(user=>{
      //no user found
      if(!user){
          return res.status(401).send({
              success:false,
              messsage:"could not find the user"
          })
      }
      //incorrect password
      if(!compareSync(req.body.password,user.password)){
        return res.status(401).send({
            success:false,
            messsage:"Incorrect password"
        })
      }
      const payload={
          username:user.username,
          id:user._id
      }
      const token=jwt.sign(payload,"Random string",{expiresIn:"1d"})
      return res.status(200).send({
          success:true,
          message:'Logged in successfully',
          token:"Bearer "+token
      })
   })
}

export const userLogin=async(req,res)=>{
    try{
        await passport.authenticate('local')
        let username=req.body.username
        let amount=req.body.amount
        let password=hashSync(req.body.password,10)
        const user=await User.create({username,password,amount});
        return res.status(200).json({
            success:true,
            message:'User created successfully',
            user:{
                 id:user._id,
                 username:user.username
            }
        })
    }catch(error){
        console.error(error);
        res.status(500).json({message:error.message})
    }    
    
}

