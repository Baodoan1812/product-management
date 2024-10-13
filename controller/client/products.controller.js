const Product=require("../../models/products.model")
const newPriceProduct= require("../../helpers/product");

module.exports.product = async (req,res)=>{
    const products= await Product.find({
        status: "active",
        deleted:"false"
    });
    const newProducts=  newPriceProduct.newPrice(products);
    res.render("./client/pages/products/index",{
        pageTitle: "Trang danh sach san pham",
        products: products,
        newProducts: newProducts
    })
}

module.exports.detail= async(req,res)=>{
        const slug=req.params.slug;
        let find={
            deleted:false,
            slug:slug
        }
        const product= await Product.findOne(find);
        if(product)
        {
            res.render("./client/pages/products/detail",{
                pageTitle:"Trang chi tiet",
                product:product
            })
        }
        else{
            res.redirect("/products");
        }
 
}