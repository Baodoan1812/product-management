const mongoose= require("mongoose");
const Product = require("../../models/products.model");
const { query } = require("express");
const filterStatusHelper=require("../../helpers/filter-status");
const searchHelper=require("../../helpers/search");
module.exports.index= async (req, res) => {
    const filterStatus=filterStatusHelper(req.query);
    let find={
        deleted:"false"
    }
    if(req.query.status)
    {
        find.status= req.query.status;
    }
    const object=searchHelper(req.query);
    let keyword=object.keyword;
    if(object.regex)
    find.title=object.regex;
    const products = await Product.find(find);
    res.render("./admin/pages/products/products.pug",{
        pageTitle:"Trang san pham",
        products: products,
        filterStatus:filterStatus,
        keyword:keyword
    });
}