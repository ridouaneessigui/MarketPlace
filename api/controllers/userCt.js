const Users=require('../models/userModel')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const userCt={
 register: async(req,res)=>{
    try {
        const {name,email,password}=req.body;
        const user=await Users.findOne({email})
        if(user) return res.status(400).json({msg:"ce mail est deja existe;"})
        if(password.length<6) return res.status(400).json({msg:"ce mot de passe est moins de 6 caracter"})
        const passwordHash = await bcrypt.hash(password,10)
        //res.json({password,passwordHash})
      //  res.json({msg:"registre success"})
      const NewUser=new Users({
          name,email,password:passwordHash
      })
      await NewUser.save()
      const accesstoken=createAccessToken({id:NewUser._id})
      const refreshtoken=createRefreshToken({id:NewUser._id})
      res.cookie('refreshtoken',refreshtoken,{
          httpOnly:true,
          path:'/user/refresh_token'
      })
     // res.json({msg:"bien enregistre"})

     res.json({accesstoken})
    } catch (err) {
        return res.status(500).json({msg:err.msg})
    }
 },


 login:async(req,res)=>{
    try {
        const{email,password}=req.body;
        const user=await Users.findOne({email})
        if(!user) return res.status(400).json({msg:"ce mail n existe pas"})
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch) return res.status(400).json({msg:"incorrect password"})
        const accesstoken=createAccessToken({id:user._id})
        const refreshtoken=createRefreshToken({id:user._id})
        res.cookie('refreshtoken',refreshtoken,{
          httpOnly:true,
          path:'/user/refresh_token'
      })
        res.json({msg:"login succes"})
    } catch (err) {
        return res.status(500).json({msg:err.message})
    }
 },

 logout:async(req,res)=>{
 try {
    res.cleatCookie('refreshtoken',{path:'/user/refresh_token'})
    return res.json({msg:"logouut out"})
} catch (err) {
    return res.status(500).json({msg:err.message})
}
},


 refreshToken:(req,res)=>{
     const rf_token=req.cookies.refreshtoken; 
     if(!rf_token)return res.status(400).json({msg:"login or register"})
     jwt.verify(rf_token,process.env.REFRESH_TOKEN_SECRET,(err,user)=>{
         if(err) return res.status(400).json({msg:"login or register"})
         const accesstoken=createAccessToken({id:user.id})
         res.json({user,accesstoken})
     })
     res.json({rf_token})
 },

 getUser:async(req,res)=>{
     try {
         const user = await Users.findById(req.user.id).select('-password')
         if(!user) return res.status(400).json({msg:"User does not exist"})

         res.json(user)
     } catch (err) {
        return res.status(500).json({msg:err.message})
     }
 }
}
const createAccessToken=(user)=>
 {
     return jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'1d'})
 }

 const createRefreshToken=(user)=>
 {
     return jwt.sign(user,process.env.REFRESH_TOKEN_SECRET,{expiresIn:'7d'})
 }
module.exports=userCt