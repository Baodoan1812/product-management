const express= require("express");
const router = express.Router();
const multer  = require('multer')
const upload = multer();
const UploadImage= require("../../middlewares/admin/uploadImage.middleware");
const cartMiddleware= require("../../middlewares/client/cart.middleware");
const userValidate= require("../../validate/client/user.validate");
const controller = require("../../controller/client/user.controller")
const resetValidate= require("../../validate/client/reset-password.validate");
router.get("/login",cartMiddleware.cart,controller.login)
router.post("/login",userValidate.login,controller.loginPost)
router.get("/register",cartMiddleware.cart,controller.register);
router.post("/register",userValidate.createUser,controller.registerPost);
router.get("/logout",controller.logout)
router.get("/password/forgot",controller.forgot)
router.post("/password/forgot",controller.forgotPost)
router.post('/password/otp',controller.otpPost)
router.post('/password/reset',resetValidate.checkPassword,controller.reset)
router.get("/info",controller.info)
router.get("/delete/:idUser",controller.delete);
router.get("/update",controller.update)
router.patch("/update/:id",
    upload.single('thumbnail'),
    UploadImage.uploadCloud,
    controller.updatePatch);
module.exports = router;