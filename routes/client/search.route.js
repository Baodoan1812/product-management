const express= require("express");
const router = express.Router();
const cartMiddleware= require("../../middlewares/client/cart.middleware");
const controller = require("../../controller/client/search.controller")
const userMiddleware= require("../../middlewares/client/user.middleware");
router.get("/",cartMiddleware.cart,controller.index)

module.exports = router;