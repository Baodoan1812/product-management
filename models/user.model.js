const mongoose = require("mongoose")
const generate= require("../helpers/generate");
const userSchema=new mongoose.Schema(
    {
        fullName: String,
        password: String,
        phone:String,
        email:String,
        avatar:String,
        tokenUser:{
            type:String,
            default:generate.generateRandomString(20)
        },
        
        status:{
            type:String,
            default:"active"
        },
        
        deleted : {
            type:Boolean,
            default: false
        },
        deleteAt: Date
    },
    {
        timestamps:true
    }
)
const User=mongoose.model('User',userSchema,"users")
module.exports=User;