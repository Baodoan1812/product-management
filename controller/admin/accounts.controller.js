const Account = require("../../models/accounts.model");
const Role = require("../../models/roles.model");
const md5 = require("md5");
module.exports.index = async (req, res) => {
    let find = {
        deleted: false
    }
    const records = await Account.find(find).select("-password -token");
    for (const record of records) {
        const role = await Role.findOne({
            _id: record.role_id,
            deleted: false
        })
        record.role = role;
    }
    res.render("./admin/pages/accounts/index", {
        pageTitle: "Trang tài khoản",
        records: records
    });
}
module.exports.create = async (req, res) => {
    let find = {
        deleted: false
    }
    const records = await Role.find(find);
    res.render("./admin/pages/accounts/create", {
        pageTitle: "Trang tao tai khoan",
        records: records
    });
}
module.exports.createPost = async (req, res) => {
    const emailExist = await Account.findOne({
        email: req.body.email,
        deleted: false
    });
    if (emailExist) {
        req.flash("error", "email da ton tai");
        res.redirect("back");
    }
    else {
        req.body.password = md5(req.body.password);
        const record = new Account(req.body);
        await record.save();
        res.redirect("back")
    }

}

module.exports.edit = async (req, res) => {
    let find = {
        deleted: false,
        _id: req.params.id
    }
    const record = await Account.findOne(find);
    const roles = await Role.find({
        deleted: false
    })
    res.render("./admin/pages/accounts/edit.pug", {
        pageTitle: "Cap nhat tai khoan",
        record: record,
        roles: roles
    })
}
module.exports.editPatch = async (req, res) => {


    const emailExist = await Account.findOne({
        _id: { $ne: req.params.id },
        email: req.body.email,
        deleted: false
    });
    if (emailExist) {
        req.flash("error", "email da ton tai");
    }
    else {
        if (req.body.password) {
            req.body.password = md5(req.body.password);

        }
        else {
            delete req.body.password;

        }
        await Account.updateOne({ _id: req.params.id }, req.body);
    }

    res.redirect("back");
}