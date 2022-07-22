const Users=require('../models/userModel')
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
      res.json({NewUser})
    } catch (err) {
        return res.status(500).json({msg:err.msg})
    }
 }
}
module.exports=userCt