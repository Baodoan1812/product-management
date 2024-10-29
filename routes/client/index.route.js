const productRoutes = require("./products.route")
const homeRoutes =require("./home.route")
const searchRoutes= require("./search.route")
const cartRoutes=require("./cart.route")
const checkoutRoute=require("./checkout.route");
const userRoute= require("./user.route");
const categoryMiddleware= require("../../middlewares/client/category.middleware");
const cartMiddleware= require("../../middlewares/client/cart.middleware");
const userInfoMiddleware= require("../../middlewares/client/infoUser.middleware");
module.exports =(app)=>{
    app.use(categoryMiddleware.category)
    app.use(userInfoMiddleware.info)
    app.use("/",homeRoutes)
    app.use("/products",productRoutes)
    app.use("/search",searchRoutes)
    app.use("/cart",cartRoutes)
    app.use("/checkout",checkoutRoute);
    app.use("/user",userRoute);

}