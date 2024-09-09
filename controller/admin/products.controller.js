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