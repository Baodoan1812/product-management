const mongoose = require("mongoose")
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
const productSchema=new mongoose.Schema(
    {
        title: String,
        parent_product_id:{
            type: String,
            default:""
        },
        description: String,
        price: Number,
        discountPercentage:Number,
        stock: Number,
        thumbnail: String,
        status: String,
        slug:{
            type:String,
            slug:"title",
            unique:true
        },
        position: Number,
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
const Product=mongoose.model('Product',productSchema,"products")
module.exports=Product;