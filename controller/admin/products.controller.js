const mongoose= require("mongoose");
const Product = require("../../models/products.model");
const ProductCategory = require("../../models/category-product.model");
const Account=require("../../models/accounts.model");
const { query } = require("express");
const createTreeHelper= require("../../helpers/createTree");
const filterStatusHelper=require("../../helpers/filter-status");
const searchHelper=require("../../helpers/search");
const paginationHelper=require("../../helpers/pagination");
// Filterstatus Search Pagination
module.exports.index= async (req, res) => {
    
    let find={
        deleted:"false"
    }
    //filterStatus
    const filterStatus=filterStatusHelper(req.query);
    if(req.query.status)
    {
        find.status= req.query.status;
    }
    //search
    const object=searchHelper(req.query);
    let keyword=object.keyword;
    if(object.regex)
    find.title=object.regex;
    // pagination

    let totalItem= await Product.find(find).countDocuments();
    const objectPagination=paginationHelper(
        {
            currentPage: 1,
            limitItem: 4
        },
        req.query,
        totalItem
    )
    
    let sort={
        position:"desc"
    }
    const sortKey=req.query.sortKey;
    const sortValue=req.query.sortValue;
    if(sortKey && sortValue)
    {
        delete sort.position;
        sort[`${sortKey}`]=sortValue;
    }
    const products = await Product.find(find).limit(objectPagination.limitItem).skip(objectPagination.skipIndex)
    .sort(sort);
    
    for (const item of products) {
        const user= await Account.findOne({
            _id:item.createdBy.account_id
        })
        if(user){
            item.fullName=user.fullName
        }
    } 
    res.render("./admin/pages/products/products.pug",{
        pageTitle:"Trang san pham",
        products: products,
        filterStatus:filterStatus,
        keyword:keyword,
        objectPagination:objectPagination
    });
}
//Change status
module.exports.changeStatus=async (req,res)=>{
    const status=req.params.status;
    const id=req.params.id;
    await Product.updateOne({_id:id},{status:status});
    req.flash('success', 'Thay doi trang thai thanh cong');
    res.redirect("back");
}
//Change Multi(Form)
module.exports.changeMulti=async (req,res)=>{
    const type=req.body.type;
    const ids=req.body.ids.split(", ");
    switch (type){
        case "active":
            await Product.updateMany({_id:ids},{status:"active"})
            req.flash('success', 'Thay doi trang thai thanh cong');
            break;
        case "inactive":
            await Product.updateMany({_id:ids},{status:"inactive"})
            req.flash('success', 'Thay doi trang thai thanh cong');
            break;
        case "delete-multi":
            await Product.updateMany({_id:ids},{deleted:true});
            req.flash('success', 'Xoa thanh cong');
        case "change-multi-position":
            for(const item of ids) {
                let [id,position]=item.split("-");
                position = parseInt(position);
                await Product.updateOne({_id:id},{position:position})
                req.flash('success', 'Thay doi vi tri thanh cong');
            }
        default:
            break;
    }
    res.redirect("back")
}
//delete item
module.exports.deleteItem= async (req,res)=>{
    const id=req.params.id;
    await Product.updateOne({_id:id},{deleted:true,
        deletedBy:{
            account_id: res.locals.user.id,
            deletedAt:new Date()
        }
    
});
    req.flash('success', 'Xoa thanh cong');
    res.redirect("back");
}
// create product
module.exports.create= async(req,res)=>{
    let find={
        deleted:false
    }
    
    const records= await ProductCategory.find(find);
    const newRecords=createTreeHelper.treeCreate(records);
    res.render("./admin/pages/products/create",{
        pageTitle: "Trang tao moi sp",
        records:newRecords
    });
}
module.exports.createItem= async(req,res)=>{
    req.body.price=parseInt(req.body.price);
    req.body.discountPercentage=parseInt(req.body.discountPercentage);
    req.body.stock=parseInt(req.body.stock);
    if(req.body.position=="")
    {
        const countProducts=await Product.countDocuments();
        req.body.position=countProducts+1;
    }
    else{
        req.body.position=parseInt(req.body.position);
    }
    req.body.createdBy={
        account_id:res.locals.user.id
    }
    const product=new Product(req.body);
    await product.save();
    res.redirect("/admin/products")
    
}
module.exports.edit= async(req,res)=>{
   try {
        let find={
            deleted:false,
            _id:req.params.id
        }
        const product= await Product.findOne(find);
        let find1={
            deleted:false
        }
        
        const records= await ProductCategory.find(find1);
        const newRecords=createTreeHelper.treeCreate(records);
        res.render("./admin/pages/products/edit",{
            pageTitle:"Trang chinh sua",
            product:product,
            records:newRecords
        });
   } catch (error) {
    req.flash("error","chinh sua that bai")
    res.redirect("/admin/products");
   }
}
module.exports.editPatch=async(req,res)=>{
    const id=req.params.id;
    req.body.price=parseInt(req.body.price);
    req.body.discountPercentage=parseInt(req.body.discountPercentage);
    req.body.stock=parseInt(req.body.stock);
    req.body.position=parseInt(req.body.position);
    
    const updatedBy = {
            account_id:res.locals.user.id,
            updatedAt: new Date()
    }
    
    await Product.updateOne({_id:id},
        {
            ...req.body,
            $push: { updatedBy:updatedBy }
        });
    res.redirect("/admin/products")
}
module.exports.detail=async(req,res)=>{
    const id=req.params.id;
    let find={
        deleted:false,
        _id:id
    }
    const product= await Product.findOne(find);
    res.render("./admin/pages/products/detail",{
        pageTitle:"Trang chi tiet san pham",
        product:product
    });
}
