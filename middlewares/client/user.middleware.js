
const User= require("../../models/user.model");

module.exports.user=async (req,res,next)=>{
    const tokenUser=req.cookies.tokenUser;
    if(!tokenUser){
        res.redirect(`/user/login`);
    }
    else{
        const user=await User.findOne({deleted:false,tokenUser:tokenUser}).select('-password');
        
        if(!user){
        res.redirect(`/user/login`);
        
        }
        else{
            res.locals.user=user;
            
            next();
        }
    }
    
}