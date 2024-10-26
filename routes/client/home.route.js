const express= require("express");
const router = express.Router();
const categoryMiddleware= require("../../middlewares/client/category.middleware");
const cartMiddleware= require("../../middlewares/client/cart.middleware");
const userMiddleware= require("../../middlewares/client/user.middleware");
const controller = require("../../controller/client/home.controller")
router.get("/",cartMiddleware.cart,userMiddleware.user,controller.index)

module.exports = router;