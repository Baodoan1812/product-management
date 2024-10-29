const express= require("express");
const router = express.Router();



const controller = require("../../controller/admin/users.controller")

router.get("/",controller.index)


module.exports = router;