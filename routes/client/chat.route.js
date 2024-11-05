const express= require("express");
const router = express.Router();
const controller = require("../../controller/client/chat.controller")
const userMiddleware= require("../../middlewares/client/user.middleware");
const cartMiddleware= require("../../middlewares/client/cart.middleware");

router.get("/",cartMiddleware.cart,controller.index)

module.exports = router;