const express= require("express");
const router= express.Router();
const multer  = require('multer')
const upload = multer();
const uploadCloud=require("../../middlewares/admin/uploadImage.middleware");
const validate=require("../../validate/admin/product.validate");
const controller= require("../../controller/admin/roles.controller.js")
router.get("/",controller.index);
router.get("/create",controller.create)
router.post("/create",
    upload.single('thumbnail'),
    uploadCloud.uploadCloud,
    validate.createItem,
    controller.createPost);
router.delete("/delete/:id",controller.delete)
router.get("/detail/:id",controller.detail)
router.get("/edit/:id",controller.edit)
router.patch("/edit/:id",
    upload.single('thumbnail'),
    uploadCloud.uploadCloud,
    validate.createItem,
    controller.editPatch)
router.get("/permissions",controller.permission)
router.patch("/permissions",controller.permissionPatch)
module.exports = router;