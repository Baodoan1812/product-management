const mongoose= require("mongoose");
const ProductCategory = require("../../models/category-product.model");
const { query } = require("express");
const createTreeHelper= require("../../helpers/createTree");
const systemConfig = require("../../config/system");
module.exports.index= async(req,res)=>{
    let find={
        deleted:false
    }
    
    const records= await ProductCategory.find(find);
    const newRecords=createTreeHelper.treeCreate(records);
    res.render("./admin/pages/category-product/index",{
        pageTitle:"Trang danh mục sản phẩm",
        records:newRecords
    });

}
module.exports.create= async (req,res)=>{
    let find={
        deleted:false
    }

    
    const records= await ProductCategory.find(find);
    const newRecords=createTreeHelper.treeCreate(records);
    res.render("./admin/pages/category-product/create",{
        pageTitle:"Trang tao danh muc san pham",
        records:newRecords
    });
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

module.exports.edit= async (req,res)=>{
    const id=req.params.id;
    const record= await ProductCategory.findOne({_id:id});
    let find={
        deleted:false
    }
    
    const records= await ProductCategory.find(find);
    const newRecords=createTreeHelper.treeCreate(records);
    res.render("./admin/pages/category-product/edit.pug",{
        pageTitle:"Chỉnh sửa sản phẩm",
        record:record,
        records:newRecords
    });
}

module.exports.editPatch= async (req,res)=>{
    const id =req.params.id;
    await ProductCategory.updateOne({_id:id},req.body);
    res.redirect(`${systemConfig.prefixAdmin}/product-category`)
}
module.exports.delete =async (req,res)=>{
    const id= req.params.id;
    await ProductCategory.updateOne({_id:id},{deleted:true});
    res.redirect("back");
}
module.exports.detail= async (req,res)=>{
    const record= await ProductCategory.findOne({_id:req.params.id});
    res.render("./admin/pages/category-product/detail.pug",{
        pageTitle:"Trang chi tiet danh muc",
        record:record
    })
}