const express= require("express");
const router = express.Router();
const cartMiddleware= require("../../middlewares/client/cart.middleware");
const controller = require("../../controller/client/cart.controller")
router.post("/add/:productId",cartMiddleware.cart,controller.cartPost)
router.get("/",cartMiddleware.cart,controller.index);
router.get("/delete/:productId",cartMiddleware.cart,controller.delete)
module.exports = router;