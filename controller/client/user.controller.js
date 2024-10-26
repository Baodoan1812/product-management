const User= require("../../models/user.model")
const md5= require("md5");
const generateHelper= require("../../helpers/generate");
const ForgotPassword = require("../../models/password-forgot.model");
module.exports.login= async (req,res)=>{
    res.render("./client/pages/user/login")
}
module.exports.loginPost= async(req,res)=>{
   
    const email= req.body.email;
    const password=  md5(req.body.password);
    const user= await User.findOne({email:email,password:password});
    if(!user){
        req.flash('error','Tai khoan khong hop le');
        res.redirect('back');
        return;
        
    }

    res.cookie('tokenUser',user.tokenUser);
    res.redirect('/');
}
module.exports.register= async (req,res)=>{
    res.render("./client/pages/user/register")
}
module.exports.registerPost= async (req,res)=>{
    const email= req.body.email;
    req.body.password=md5(req.body.password);
    const emailExist= await User.findOne({email:email});
    
    if(emailExist){
        req.flash('error','Email da ton tai');
        res.redirect('back');
        return;
    }
    const user= new User(req.body);
    await user.save();
    res.cookie("tokenUser",user.tokenUser);
    res.redirect("/");
}
module.exports.logout=async (req,res)=>{
    res.clearCookie("tokenUser");
    res.redirect("/user/login");
}
module.exports.forgot= async(req,res)=>{
    res.render("./client/pages/user/password-forgot")
}
module.exports.forgotPost= async(req,res)=>{
   
    const email=req.body.email;
    const user= await User.findOne({email:email});
    if(!user){
        res.redirect('back');
        return;
    }
    const otp= generateHelper.generateRandomNumber(8);
    const objectForgotPassword={
        email:email,
        otp:otp,
        expireAt: Date.now()
    }
    const forgotPassword= new ForgotPassword(objectForgotPassword);
    await forgotPassword.save();
    res.send("OK");
}
