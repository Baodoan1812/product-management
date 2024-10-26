const express= require("express");
const router = express.Router();
const cartMiddleware= require("../../middlewares/client/cart.middleware");
const controller = require("../../controller/client/cart.controller")
const userMiddleware= require("../../middlewares/client/user.middleware");
router.post("/add/:productId",cartMiddleware.cart,userMiddleware.user,controller.cartPost)
router.get("/",cartMiddleware.cart,userMiddleware.user,controller.index);
router.get("/delete/:productId",cartMiddleware.cart,userMiddleware.user,controller.delete)
router.get("/update/:productId/:val",cartMiddleware.cart,userMiddleware.user,controller.update)
module.exports = router;