const mongoose= require("mongoose");
const Product = require("../../models/products.model");
const { query } = require("express");
const filterStatusHelper=require("../../helpers/filter-status");
const searchHelper=require("../../helpers/search");
const paginationHelper=require("../../helpers/pagination");
module.exports.index= async (req, res) => {
    
    let find={
        deleted:"false"
    }
    //filterStatus
    const filterStatus=filterStatusHelper(req.query);
    if(req.query.status)
    {
        find.status= req.query.status;
    }
    //search
    const object=searchHelper(req.query);
    let keyword=object.keyword;
    if(object.regex)
    find.title=object.regex;
    // pagination

    let totalItem= await Product.find(find).countDocuments();
    const objectPagination=paginationHelper(
        {
            currentPage: 1,
            limitItem: 4
        },
        req.query,
        totalItem
    )
    

    const products = await Product.find(find).limit(objectPagination.limitItem).skip(objectPagination.skipIndex);
    
    
    res.render("./admin/pages/products/products.pug",{
        pageTitle:"Trang san pham",
        products: products,
        filterStatus:filterStatus,
        keyword:keyword,
        objectPagination:objectPagination
    });
}

module.exports.changeStatus=async (req,res)=>{
    const status=req.params.status;
    const id=req.params.id;
    await Product.updateOne({_id:id},{status:status});
    res.redirect("back");
}
module.exports.changeMulti=async (req,res)=>{
    const type=req.body.type;
    const ids=req.body.ids.split(", ");
    switch (type){
        case "active":
            await Product.updateMany({_id:ids},{status:"active"})
            break;
        case "inactive":
            await Product.updateMany({_id:ids},{status:"inactive"})
            break;
            break;
        default:
            break;
    }
    res.redirect("back")
}