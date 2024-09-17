const Product=require("../../models/products.model")
module.exports.product = async (req,res)=>{
    const products= await Product.find({
        status: "active",
        deleted:"false"
    });
    const newProducts= products.map((item)=>{
        item.priceNew=(item.price*(100-item.discountPercentage)/100).toFixed(0);
        return item;
    })
    res.render("./client/pages/products/index",{
        pageTitle: "Trang danh sach san pham",
        products: products,
        newProducts: newProducts
    })
}

module.exports.detail= async(req,res)=>{
    try {
        const slug=req.params.slug;
    let find={
        deleted:false,
        slug:slug
    }
    const product= await Product.findOne(find);
    res.render("./client/pages/products/detail",{
        pageTitle:"Trang chi tiet",
        product:product
    })
    } catch (error) {
        res.redirect("/products");
    }
}