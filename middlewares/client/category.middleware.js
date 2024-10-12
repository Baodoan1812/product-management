const ProductCategory= require("../../models/category-product.model");
const createTreeHelper= require("../../helpers/createTree");
module.exports.category=async (req,res,next)=>{
    const records= await ProductCategory.find({deleted:false});
    const newRecords=createTreeHelper.treeCreate(records);
    res.locals.layoutCategoryProducts =newRecords;
    next();
}