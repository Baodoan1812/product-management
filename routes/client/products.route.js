const express = require("express");
const router=express.Router();
const cartMiddleware= require("../../middlewares/client/cart.middleware");
const controller = require("../../controller/client/products.controller")
const userMiddleware= require("../../middlewares/client/user.middleware");
router.get("/",cartMiddleware.cart,userMiddleware.user,controller.product)
router.get("/:slugCategory",cartMiddleware.cart,userMiddleware.user,controller.categoryProduct)
router.get("/detail/:slugProduct",cartMiddleware.cart,userMiddleware.user,controller.detail);
module.exports=router