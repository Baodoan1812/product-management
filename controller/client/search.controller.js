const Product= require("../../models/products.model")
const newPriceProduct= require("../../helpers/product");
module.exports.index = async (req, res) => {
   const keyword= req.query.keyword;

   
   const reg = new RegExp(keyword,"i");
   const products=  await Product.find({
    deleted:false,
    status:"active",
    title:reg
   })
   const newProducts= newPriceProduct.newPrice(products);
   
   res.render("./client/pages/search/index",{
    products:newProducts,
    keyword:keyword
   })
}