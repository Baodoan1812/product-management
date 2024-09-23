const mongoose = require("mongoose")
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
const productSchema=new mongoose.Schema(
    {
        title: String,
        description: String,
        thumbnail: String,
        status: String,
        parent_id:{
            type:String,
            default:""
        },
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
const ProductCategory=mongoose.model('ProductCategory',productSchema,"products-category")
module.exports=ProductCategory;