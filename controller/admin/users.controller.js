const Account = require("../../models/accounts.model");
const User= require("../../models/user.model");
const systemConfig= require("../../config/system");
module.exports.index= async (req,res)=>{
    const users= await User.find({deleted:false,status:"active"});
    res.render("./admin/pages/users/index",{
        users:users
    }); 
}
module.exports.info= async(req,res)=>{
    const user= await User.findOne({_id:req.params.id});
    res.render("./admin/pages/users/info",{
        user:user
    });
}
module.exports.edit= async(req,res)=>{
    const id=req.params.id;
    const user= await User.findOne({_id:id});

    res.render("./admin/pages/users/edit",{
        user:user
    })
}

