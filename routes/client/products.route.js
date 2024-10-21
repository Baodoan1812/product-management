const express = require("express");
const router=express.Router();
const cartMiddleware= require("../../middlewares/client/cart.middleware");
const controller = require("../../controller/client/products.controller")
router.get("/",cartMiddleware.cart,controller.product)
router.get("/:slugCategory",cartMiddleware.cart,controller.categoryProduct)
router.get("/detail/:slugProduct",cartMiddleware.cart,controller.detail);
module.exports=router