module.exports.createUser = (req, res, next)=>{
    if(!req.body.fullName){
        req.flash('error','Vui long nhap ten')
        res.redirect("/user/register");
        return;
    }
    if(!req.body.password){
        
        res.redirect("/user/register");
        return;
    }
    if(!req.body.email){
        
        res.redirect("/user/register");
        return;
    }
    next();
}
module.exports.login = (req, res, next)=>{
    if(!req.body.password){
        req.flash('error','Vui long nhap mat khau');
        res.redirect("/user/login");
        return;
    }
  
    if(!req.body.email){
        req.flash('error','Vui long nhap email');
        res.redirect("/user/login");
        return;
    }
    next();
}