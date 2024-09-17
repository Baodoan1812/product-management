const express= require("express");
const router= express.Router();
const controller= require("../../controller/admin/products.controller");
const multer  = require('multer')
const storageMulter=require("../../helpers/storageMulter");
const upload = multer({ storage: storageMulter() });
const validate=require("../../validate/admin/product.validate");
router.get("/",controller.index);
router.patch("/change-status/:status/:id",controller.changeStatus);
router.patch("/change-multi",controller.changeMulti);
router.delete("/delete/:id",controller.deleteItem);
router.get("/create",controller.create);
router.post(
    "/create",
    upload.single('thumbnail'),
    validate.createItem,
    controller.createItem
);
router.get("/edit/:id",controller.edit);
router.patch("/edit/:id",
    upload.single('thumbnail'),
    validate.createItem,
    controller.editPatch)
module.exports=router;