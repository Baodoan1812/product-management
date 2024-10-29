const User= require("../../models/user.model");
module.exports.info=async (req,res,next)=>{
    if(req.cookies.tokenUser){
        const user = await User.findOne({tokenUser:req.cookies.tokenUser});
        if(user){
            res.locals.user= user;
        }
    }
    next();
}