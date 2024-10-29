const express= require("express");
const router = express.Router();
const cartMiddleware= require("../../middlewares/client/cart.middleware");
const controller = require("../../controller/client/checkout.controller")
const userMiddleware= require("../../middlewares/client/user.middleware");
router.get("/",cartMiddleware.cart,controller.index);
router.post("/order",cartMiddleware.cart,controller.order)
router.get("/success/:orderId",cartMiddleware.cart,controller.success)
module.exports = router;