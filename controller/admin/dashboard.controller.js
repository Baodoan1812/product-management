module.exports.index =  (req, res) => {
    res.render("./admin/pages/dashboard/dashboard",{
        pageTitle: "Trang tong quan"
    });
}