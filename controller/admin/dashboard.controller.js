const mongoose = require("mongoose");
const { query } = require("express");
const ProductCategory = require("../../models/category-product.model");
const Product = require("../../models/products.model")
const Account = require("../../models/accounts.model");
module.exports.index = async (req, res) => {
    const object = {
        category: {
            total: 0,
            active: 0,
            inactive: 0
        },
        product: {
            total: 0,
            active: 0,
            inactive: 0
        },
        account: {
            total: 0,
            active: 0,
            inactive: 0
        }
    }
    object.category.total = await ProductCategory.countDocuments({ deleted: false })
    object.category.active = await ProductCategory.countDocuments({ deleted: false, status: "active" })
    object.category.inactive = await ProductCategory.countDocuments({ deleted: false, status: "inactive" })
    object.product.total = await Product.countDocuments({ deleted: false })
    object.product.active = await Product.countDocuments({ deleted: false, status: "active" })
    object.product.inactive = await Product.countDocuments({ deleted: false, status: "inactive" })
    object.account.total = await Account.countDocuments({ deleted: false })
    object.account.active = await Account.countDocuments({ deleted: false, status: "active" })
    object.account.inactive = await Account.countDocuments({ deleted: false, status: "inactive" })
    res.render("./admin/pages/dashboard/dashboard", {
        pageTitle: "Trang tổng quan",
        object: object
    });
}