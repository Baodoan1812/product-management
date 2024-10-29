const mongoose = require("mongoose")

const cartsSchema=new mongoose.Schema(
    {
        user_id:{
            type:String,
            default:""
        },
        products:[
            {
                product_id:String,
                quantity:Number
            }
        ]
    },
    {
        timestamps:true
    }
)
const Cart=mongoose.model('Cart',cartsSchema,"cart")
module.exports=Cart;