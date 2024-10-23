const Cart= require("../../models/cart.model")
const Product= require("../../models/products.model");
const productHelper= require("../../helpers/product");
module.exports.cartPost = async (req, res) => {
    const productId= req.params.productId;
    const quantity= parseInt(req.body.quantity);
    
    
    const cart= await Cart.findOne({
        _id:req.cookies.cartId
    })
    const productExist= cart.products.find(item => item.product_id==productId);
    if(productExist){
        const newQuantity= quantity+productExist.quantity;
        await Cart.updateOne(
            {
                _id: req.cookies.cartId,
                "products.product_id": productId
            },
            {
                $set:{
                    "products.$.quantity": newQuantity
                }
            })
    }
    else{
        const objectCart={
            product_id:productId,
            quantity:quantity
        }
        await Cart.updateOne(
            {
                _id: req.cookies.cartId
            },
            {
                $push: {products: objectCart}
            }
        )
    }
    
    res.redirect("back")
}

module.exports.index= async (req,res)=>{
    const cartId= req.cookies.cartId;
    const cart= await Cart.findOne({_id:cartId});
    for (const product of cart.products) {
        const infoProduct= await Product.findOne({_id:product.product_id}).select("thumbnail title price discountPercentage slug")
        product.infoProduct=productHelper.newPriceOne(infoProduct);
        const totalPrice= product.quantity*product.infoProduct.priceNew;
        product.totalPrice= totalPrice;
    }
    cart.totalPrice=cart.products.reduce((sum,item)=>sum+item.totalPrice,0);
   
    
    res.render("./client/pages/cart/index",{
        cart:cart
    });
}
module.exports.delete = async(req,res)=>{
    const cartId=req.cookies.cartId;
    
    const productId=req.params.productId;
    
    await Cart.updateOne(
        { _id: cartId }, 
        { $pull: { products: { product_id : productId } } }
    )
    res.redirect("back");
} 