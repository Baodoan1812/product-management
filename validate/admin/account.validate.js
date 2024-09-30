module.exports.createAccount = (req, res, next)=>{
    if(!req.body.fullName){
        req.flash('error','Vui long nhap tieu de');
        res.redirect("/admin/accounts/create");
        return;
    }
    if(!req.body.password){
        req.flash('error','Vui long nhap tieu de');
        res.redirect("/admin/accounts/create");
        return;
    }
    if(!req.body.email){
        req.flash('error','Vui long nhap tieu de');
        res.redirect("/admin/accounts/create");
        return;
    }
    next();
}
module.exports.editAccount = (req, res, next)=>{
    if(!req.body.fullName){
        req.flash('error','Vui long nhap tieu de');
        res.redirect("/admin/accounts/create");
        return;
    }
  
    if(!req.body.email){
        req.flash('error','Vui long nhap tieu de');
        res.redirect("/admin/accounts/create");
        return;
    }
    next();
}