const { Router } = require('express')
const userCt=require('../controllers/userCt')
const router= require('express').Router()
const auth=require('../middleware/auth')
router.post('/registre',userCt.register)
router.post('/login',userCt.login)
router.get('/logout',userCt.logout)
router.get('/refresh_token',userCt.refreshToken)


router.get('/info',auth,userCt.getUser)

module.exports=router