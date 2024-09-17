module.exports.createItem = (req, res, next)=>{
    if(!req.body.title){
        req.flash('error','Vui long nhap tieu de');
        res.redirect("/admin/products/create");
        return;
    }
    next();
}