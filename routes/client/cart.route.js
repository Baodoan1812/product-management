const express= require("express");
const router = express.Router();
const cartMiddleware= require("../../middlewares/client/cart.middleware");
const controller = require("../../controller/client/cart.controller")
router.post("/add/:productId",cartMiddleware.cart,controller.cartPost)

module.exports = router;