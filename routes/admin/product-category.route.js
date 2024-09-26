const express= require("express");
const router = express.Router();
const multer  = require('multer')
const upload = multer();
const UploadImage= require("../../middlewares/admin/uploadImage.middleware");
const validate=require("../../validate/admin/product.validate");
const controller = require("../../controller/admin/product-category.controller")
router.get("/",controller.index)
router.get("/create",controller.create);
router.post("/create",
    upload.single('thumbnail'),
    UploadImage.uploadCloud,
    validate.createItem,
    controller.createPost);
router.get("/edit/:id",controller.edit);

router.patch("/edit/:id",
            upload.single('thumbnail'),
            UploadImage.uploadCloud,
            validate.createItem,
            controller.editPatch)
router.delete("/delete/:id",controller.delete)
router.get("/detail/:id",controller.detail)
module.exports = router;