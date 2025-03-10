const Product = require("../../models/products.model")
const newPriceProduct = require("../../helpers/product");
module.exports.index = async (req, res) => {
    const records = await Product.find({
        deleted: false,
        status: "active",
        featured: "1"
    }).sort({ position: "desc" }).limit(6);
    const newProducts = await Product.find({
        deleted: false,
        status: "active",
    }).sort({ position: "desc" }).limit(6);
    const featuredProducts = newPriceProduct.newPrice(records);
    const newProduct = newPriceProduct.newPrice(newProducts)
    console.log(newProducts);
    // console.log(records);
    res.render("./client/pages/home/index", {
        pageTitle: "Trang chủ",
        records: featuredProducts,
        newProduct: newProduct
    })
}