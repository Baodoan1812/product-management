const mongoose= require("mongoose");
const ProductCategory = require("../../models/category-product.model");
const { query } = require("express");
module.exports.index= async(req,res)=>{
    let find={
        deleted:false
    }
    const records= await ProductCategory.find(find);
    res.render("./admin/pages/category-product/index",{
        pageTitle:"Trang danh mục sản phẩm",
        records:records
    });

}
module.exports.create=(req,res)=>{
    res.render("./admin/pages/category-product/create");
}
module.exports.createPost= async (req,res)=>{
    if(req.body.position=="")
        {
            const count=await ProductCategory.countDocuments();
            req.body.position=count+1;
        }
        else{
            req.body.position=parseInt(req.body.position);
        }
    const records=new ProductCategory(req.body);
    await records.save();
    res.redirect("/admin/product-category")
    
}