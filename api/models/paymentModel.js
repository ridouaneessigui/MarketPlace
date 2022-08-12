const mongoose=require('mongoose')

const paymentSchema= new mongoose.Schema({
    user_id:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    cart:{
        type:Array,
        default:[]
    },
    status:{
        type:Boolean,
        default:false
    },
    date: { 
        type: Date, 
        default: Date.now
     },

})