const systemConfig=require("../../config/system");
const Account= require("../../models/accounts.model");
const Role= require("../../models/roles.model");
module.exports.auth=async (req,res,next)=>{
    const token=req.cookies.token;
    if(!token){
        res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
    }
    else{
        const user=await Account.findOne({deleted:false,token:token}).select('-password');
        if(!user){
        res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
        }
        else{
            res.locals.user=user;
            const role= await Role.findOne({_id:user.role_id}).select("title permission");
            res.locals.role=role;
            next();
        }
    }
    
}