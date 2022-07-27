const { Router } = require('express')
const router= require('express').Router()
const productCtl=require('../controllers/productCtl')
const auth=require('../middleware/auth')
const authAdmin=require('../middleware/authAdmin')

 router.route('/products')
 .get(productCtl.getProducts)
 .post(productCtl.createProduct)

 router.route('/products/:id')
 .delete(auth,authAdmin,productCtl.deleteProduct)
 .put(productCtl.updateProduct)


module.exports=router