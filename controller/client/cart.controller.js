const Cart= require("../../models/cart.model")
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