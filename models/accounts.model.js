const mongoose = require("mongoose")
const generate= require("../helpers/generate");
const accountSchema=new mongoose.Schema(
    {
        fullName: String,
        password: String,
        phone:String,
        email:String,
        avatar:String,
        token:{
            type:String,
            default:generate.generateRandomString(20)
        },
        role_id:String,
        status:String,
        
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
const Account=mongoose.model('Account',accountSchema,"accounts")
module.exports=Account;