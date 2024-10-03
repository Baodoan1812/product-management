const Account = require("../../models/accounts.model");
const md5= require("md5")
const systemConfig= require("../../config/system");
module.exports.index=(req,res)=>{
    res.render("./admin/pages/auth/login");
}
module.exports.loginPost=async (req,res)=>{
    const email=req.body.email;
    const password= md5(req.body.password);
    const user= await Account.findOne({
        email:email,
        password:password,
        deleted:false
    })
    if(!user){
        req.flash("error","Tai khoan khong ton tai");
        res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
    }
    res.cookie("token",user.token);
    res.redirect(`${systemConfig.prefixAdmin}/dashboard`)
   
}
module.exports.logout= async(req,res)=>{
    res.clearCookie("token");
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
}

