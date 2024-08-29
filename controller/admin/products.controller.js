const mongoose= require("mongoose");
const Product = require("../../models/products.model");
module.exports.index= async (req, res) => {
    const products = await Product.find({
        deleted:"false"
    });
    console.log(products);
    res.render("./admin/pages/products/products.pug",{
        pageTitle:"Trang san pham",
        products: products
    });
}