module.exports.checkPassword=async (req,res,next)=>{
    const password= req.body.password;
    const confirmPassword= req.body.confirmPassword;
    if(confirmPassword!=password){
        res.redirect('/user/password/forgot');
        return;
    }
    next();
}