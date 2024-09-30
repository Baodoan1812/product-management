const express= require("express");
const router = express.Router();
const multer  = require('multer')
const upload = multer();
const uploadCloud=require("../../middlewares/admin/uploadImage.middleware");
const controller = require("../../controller/admin/accounts.controller")
const validate = require("../../validate/admin/account.validate");
router.get("/",controller.index)
router.get("/create",controller.create);
router.post("/create",
    upload.single('avatar'),
    uploadCloud.uploadCloud,
    validate.createAccount,
    controller.createPost
);

router.get("/edit/:id",controller.edit);
router.patch("/edit/:id",
    upload.single('avatar'),
    uploadCloud.uploadCloud,
    validate.editAccount,
    controller.editPatch
);
module.exports = router;