const Account = require("../../models/accounts.model");
const User= require("../../models/user.model");
const systemConfig= require("../../config/system");
module.exports.index= async (req,res)=>{
    const users= await User.find({deleted:false,status:"active"});
    res.render("./admin/pages/users/index",{
        users:users
    });

    
}

