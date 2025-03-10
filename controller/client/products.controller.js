const Product = require("../../models/products.model")
const ProductCategory = require("../../models/category-product.model");
const newPriceProduct = require("../../helpers/product");

module.exports.product = async (req, res) => {
    const products = await Product.find({
        status: "active",
        deleted: "false"
    });
    const newProducts = newPriceProduct.newPrice(products);
    res.render("client/pages/products/index", {
        pageTitle: "Trang danh sách sản phẩm",
        products: products,
        newProducts: newProducts
    })
}

module.exports.detail = async (req, res) => {
    const slugProduct = req.params.slugProduct;
    let find = {
        deleted: false,
        slug: slugProduct
    }
    const product = await Product.findOne(find);
    if (product) {
        const newProduct = newPriceProduct.newPriceOne(product);
        if (product.parent_product_id) {
            const productParent = await ProductCategory.findOne({
                _id: product.parent_product_id,
                deleted: false,
                status: "active"
            })
            newProduct.parent = productParent;
        }

        res.render("client/pages/products/detail", {
            pageTitle: "Trang chi tiet",
            product: newProduct
        })
    }
    else {
        res.redirect("/products");
    }

}
module.exports.categoryProduct = async (req, res) => {

    const Category = await ProductCategory.findOne({
        deleted: false,
        slug: req.params.slugCategory
    })
    const getSubCategory = async (parentId) => {
        const subs = await ProductCategory.find({
            parent_id: parentId,
            deleted: false,
            status: "active"
        });
        let allSub = [...subs];
        for (const sub of subs) {
            const childs = await getSubCategory(sub.id);
            allSub = allSub.concat(childs);
        }
        return allSub;
    }

    if (Category) {
        const list = await getSubCategory(Category.id)
        const newlist = list.map(item => item.id)
        const products = await Product.find({
            deleted: false,
            parent_product_id: { $in: [Category.id, ...newlist] }
        }).sort({ position: "desc" })

        const newProducts = newPriceProduct.newPrice(products);
        res.render("client/pages/products/index", {
            pageTitle: Category.title,
            newProducts: newProducts
        })
    }
}