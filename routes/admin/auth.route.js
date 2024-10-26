const express= require("express");
const router = express.Router();
// const multer  = require('multer')
// const upload = multer();
// const UploadImage= require("../../middlewares/admin/uploadImage.middleware");
// const validate=require("../../validate/admin/auth.validate");
const controller = require("../../controller/admin/auth.controller")
router.get("/login",controller.index)
router.post("/login",controller.loginPost);
router.get("/logout",controller.logout)

module.exports = router;