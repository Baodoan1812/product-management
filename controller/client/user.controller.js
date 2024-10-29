const User= require("../../models/user.model")
const md5= require("md5");
const Cart= require("../../models/cart.model")
const generateHelper= require("../../helpers/generate");
const ForgotPassword = require("../../models/password-forgot.model");
const sendOtpHelper= require("../../helpers/sendOtpEmail");
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
    console.log(req.cookies.cartId);
    console.log(user.id);
    const cart= await Cart.findOne({user_id:user.id});
    

    if(cart){
        res.cookie("cartId",cart.id);
    }
    else{
        await Cart.updateOne({_id:req.cookies.cartId},{user_id:user.id});
    }
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
    await Cart.updateOne({_id:req.cookies.cartId},{user_id:user.id});
    res.redirect("/");
}
module.exports.logout=async (req,res)=>{
    res.clearCookie("tokenUser");
    res.clearCookie("cartId");
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
    const subject= "Mã OTP xác nhận mật khẩu";
    const content=`Mã OTP:<b>${otp}</b>`;
    sendOtpHelper.sendOtp(email,subject,content);
    res.render("./client/pages/user/otp",{
        email:email
    }
    );
}
module.exports.otpPost= async(req,res)=>{
    const otp= req.body.otp;
    const email= req.body.email;
    
    const userForgot= await ForgotPassword.findOne({email:email,otp:otp});
    if(!userForgot){
        req.flash('error','Ma OTP khong hop le');
        res.redirect('back');
        return;
    }
    const user= await User.findOne({email:email});
    res.cookie("tokenUser",user.tokenUser);
    res.render("./client/pages/user/reset-password");
}
module.exports.reset= async(req,res)=>{
    const password= md5(req.body.password);
    const tokenUser= req.cookies.tokenUser;
    const user= await User.findOne({tokenUser:tokenUser});
    await User.updateOne({tokenUser:tokenUser},{password:password});
    res.redirect("/");
}
module.exports.info=async(req,res)=>{
    res.render("./client/pages/user/info");
}
module.exports.delete= async(req,res)=>{
    const id= req.params.idUser;
    await User.updateOne({_id:id},{deleted:true})
    res.redirect('back');
}
module.exports.update= async(req,res)=>{
    const tokenUser= req.cookies.tokenUser;
    const user= await User.findOne({tokenUser:tokenUser});

    res.render("./client/pages/user/update",{
        user:user
    })
}
module.exports.updatePatch= async(req,res)=>{
    const id= req.params.id;
    if(!req.body.password){
        delete req.body.password;
    }
    else{
        req.body.password= md5(req.body.password);
    }
    
    const emailExist= await User.findOne({_id:{ $ne:req.params.id},email:req.body.email})
    if(emailExist){
        delete req.body.email;
    }
    await User.updateOne({_id:req.params.id},req.body)

    res.redirect('back');
}