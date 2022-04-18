import express from "express";
const router=express.Router()
import passport from "passport";

//productController
import {listProducts,createProducts,updateProducts,destroyProducts,searchProducts,matchandGroup,project,groupandCount,pagefirstName,inProducts,ninProducts,getResults,equal, countProducts, getPipeline, filteredObjects, getTwoProducts, getAndProducts, getSortedProducts, getGreaterValue}from '../controller/productController.js'

//cartController
import {listCart,createCart,updateCartItem,destroyCart, populateCart} from '../controller/cartController.js'

//orderController
import {listOder,createOrder,destroyOrder,unwind,getResultsById,getArrayResults, getVerifiedMessage, updateOrder} from '../controller/orderController.js'

//categoryController
import {listCategory,createCategory,destroyCategory,populateCategory,lookup} from '../controller/categoryController.js'

//detailsController
import {listDetails,createDetails,destroyDetails, getFilteredDetails} from '../controller/detailsController.js'

//userController
import { getLoginDetails, userLogin} from "../controller/userController.js";

//mport { getPayment } from "../controller/passportController.js";

//passportController
//import{getPayment} from '../controller/passportController.js'


//productController
router.get('/products',listProducts)
router.post('/products',createProducts)
router.put('/products/:id',updateProducts)
router.delete('/products/:id',destroyProducts)
router.get('/search/:name/:description',searchProducts)
router.get('/or',getTwoProducts)
router.get('/greater',getGreaterValue)
router.get('/and',getAndProducts)
router.get('/matchandGroup',matchandGroup)
router.get('/sort',getSortedProducts)
router.get('/project',project)
router.get('/count',countProducts)
router.get('/groupandCount',groupandCount)
router.get('/pagefirstName',pagefirstName)
router.get('/in',inProducts)
router.get('/nin',ninProducts)
router.get('/eq',equal)
router.get('/getResults',getResults)
router.get('/getPipeline',getPipeline)
router.get('/filteredObjects/:name',filteredObjects)


//cartController
router.get('/carts',listCart)
router.post('/carts',createCart)
router.put('/carts/:id',updateCartItem)
router.delete('/carts/:id',destroyCart)
router.get('/populateCart',populateCart)


//orderController
router.get('/orders',listOder)
router.post('/orders',createOrder)
router.put('orders/:id',updateOrder)
router.delete('/orders/:id',destroyOrder)
router.get('/unwind',unwind)
router.get('/getResultsById',getResultsById)
router.get('/getArrayResults/:id',getArrayResults)
router.get('/getVerifiedMessage',getVerifiedMessage)

//categoryController
router.get('/getcategory',listCategory)
router.post('/createCategory',createCategory)
router.delete('/deleteCategory/:id',destroyCategory)
router.get('/categoryPopulate',populateCategory)
router.get('/lookups',lookup)

//detailsController
router.get('/getDetails',listDetails)
router.post('/createDetails',createDetails)
router.delete('/deleteDetails/:id',destroyDetails)
router.get('/getFilteredDetails',getFilteredDetails)

//userController
router.post('/getUserLogin',userLogin)
router.post('/getLoginDetails',getLoginDetails)
//router.get('/protected',getPayment)


router.get('/getOrderDetails',passport.authenticate('jwt',{session:false}),(req,res)=>{
    res.status(200).send({
        success:true,
        user:{
            id:req.user._id,
            username:req.user.username,
            amount:req.user.amount
        }
    })
})


export default router