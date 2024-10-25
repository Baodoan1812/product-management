const Cart= require("../../models/cart.model")
const Product= require("../../models/products.model");
const Order= require("../../models/order.model");
const productHelper= require("../../helpers/product");
const { model } = require("mongoose");
const { cart } = require("../../middlewares/client/cart.middleware");
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
   
    
    res.render("./client/pages/checkout/index",{
        cart:cart
    });
}
module.exports.order= async( req,res)=>{
    const cartId= req.cookies.cartId;
  
    const cart= await Cart.findOne({_id:cartId});
    const products=[] ;
    for (const product of cart.products) {
        const objectProduct={
            product_id:product.product_id,
            price:0,
            discountPercentage:0,
            quantity:product.quantity
    }
    const infoProduct= await Product.findOne({_id:product.product_id}).select("price discountPercentage");
    objectProduct.price= infoProduct.price;
    objectProduct.discountPercentage= infoProduct.discountPercentage;
    products.push(objectProduct);
    }
    const infoOrder={
        
        cart_id: cartId,
        userInfo: req.body,
        products: products
    }
    const order= new Order(infoOrder);
    order.save();
   
    await Cart.updateOne(
        { _id: cartId }, 
        { products:[] }
    )
    res.redirect(`/checkout/success/${order.id}`);
}
module.exports.success= async(req,res)=>{
    const orderId= req.params.orderId;
    const order = await Order.findOne({_id:orderId});
    for (const product of order.products) {
        const productInfo= await Product.findOne({_id:product.product_id}).select("title thumbnail")
        productInfo.price= product.price;
        productInfo.discountPercentage= product.discountPercentage;
        product.productInfo= productHelper.newPriceOne(productInfo);
        
       
        product.totalPrice= product.productInfo.priceNew * parseInt(product.quantity);
    }
    order.totalPrice= order.products.reduce((sum,item)=>sum+item.totalPrice,0);
    res.render("./client/pages/checkout/success",{
        order:order,
        products:order.products
    });
}