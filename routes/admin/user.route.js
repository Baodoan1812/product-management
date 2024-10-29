const express= require("express");
const router = express.Router();



const controller = require("../../controller/admin/users.controller")

router.get("/",controller.index)
router.get("/info/:id",controller.info)
router.get("/edit/:id",controller.edit)
module.exports = router;