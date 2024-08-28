const express = require("express");
const router=express.Router();

const controller = require("../../controller/client/products.controller")
router.get("/",controller.product)
module.exports=router