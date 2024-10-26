const express= require("express");
const router = express.Router();
const cartMiddleware= require("../../middlewares/client/cart.middleware");
const controller = require("../../controller/client/checkout.controller")
const userMiddleware= require("../../middlewares/client/user.middleware");
router.get("/",cartMiddleware.cart,userMiddleware.user,controller.index);
router.post("/order",cartMiddleware.cart,userMiddleware.user,controller.order)
router.get("/success/:orderId",cartMiddleware.cart,userMiddleware.user,controller.success)
module.exports = router;