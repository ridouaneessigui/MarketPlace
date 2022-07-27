const { Router } = require('express')
const router= require('express').Router()
const categoryCt=require('../controllers/categoryCt')
const auth=require('../middleware/auth')
const authAdmin=require('../middleware/authAdmin')
 router.route('/category')
 .get(categoryCt.getCategories)
 .post(auth,authAdmin,categoryCt.createCategory)

 router.route('/category/:id')
 .delete(auth,authAdmin,categoryCt.deleteCategory)
 .put(auth,authAdmin,categoryCt.updateCategory)

module.exports=router