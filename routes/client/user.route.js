const express= require("express");
const router = express.Router();
const cartMiddleware= require("../../middlewares/client/cart.middleware");
const userValidate= require("../../validate/client/user.validate");
const controller = require("../../controller/client/user.controller")
router.get("/login",controller.login)
router.post("/login",userValidate.login,controller.loginPost)
router.get("/register",controller.register);
router.post("/register",userValidate.createUser,controller.registerPost);
router.get("/logout",controller.logout)
router.get("/password/forgot",controller.forgot)
router.post("/password/forgot",controller.forgotPost)

module.exports = router;