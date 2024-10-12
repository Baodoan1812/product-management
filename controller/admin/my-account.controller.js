const mongoose= require("mongoose");
const { query } = require("express");
module.exports.index =(req,res)=>{
    res.render("./admin/pages/my-account/index",{
        pageTitle:"Trang chi tiết tài khoản"
    })
}