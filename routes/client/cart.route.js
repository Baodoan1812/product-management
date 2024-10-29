const express= require("express");
const router = express.Router();
const cartMiddleware= require("../../middlewares/client/cart.middleware");
const controller = require("../../controller/client/cart.controller")
const userMiddleware= require("../../middlewares/client/user.middleware");
router.post("/add/:productId",cartMiddleware.cart,controller.cartPost)
router.get("/",cartMiddleware.cart,controller.index);
router.get("/delete/:productId",cartMiddleware.cart,controller.delete)
router.get("/update/:productId/:val",cartMiddleware.cart,controller.update)
module.exports = router;