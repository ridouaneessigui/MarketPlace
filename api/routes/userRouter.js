const { Router } = require('express')
const userCt=require('../controllers/userCt')
const router= require('express').Router()

router.post('/registre',userCt.register)

module.exports=router