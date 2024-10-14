const express = require("express");
const router=express.Router();

const controller = require("../../controller/client/products.controller")
router.get("/",controller.product)
router.get("/:slugCategory",controller.categoryProduct)
router.get("/detail/:slugProduct",controller.detail);
module.exports=router