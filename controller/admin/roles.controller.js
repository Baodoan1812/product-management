const mongoose= require("mongoose");
const Role= require("../../models/roles.model");
const { query } = require("express");
module.exports.index= async (req,res)=>{
    let find={
        deleted:false
    }
    const records = await Role.find(find);
   
    res.render("./admin/pages/roles/index",{
        pageTitle:"Nhom quyen",
        records:records
    })
}

module.exports.create=async (req,res)=>{
    res.render("./admin/pages/roles/create.pug",{
        pageTitle:"Trang tao nhom quyen"
    });
}
module.exports.createPost=async (req,res)=>{
    console.log(req.body);
    const record = new Role(req.body);
    await record.save() 
    res.redirect("back");
}
module.exports.delete=async(req,res)=>{
    const id= req.params.id;
    console.log(id);
    await Role.updateOne({_id:id},{deleted:true});
    res.redirect("back")
}

module.exports.detail= async(req,res)=>{
    const id=req.params.id;
    const product=await Role.findOne({_id:id});
    res.render("./admin/pages/roles/detail.pug",{
        pageTitle:"Trang chi tiet nhom quyen",
        product:product
    });
}

module.exports.edit= async (req,res)=>{
    const id=req.params.id;
    const record = await Role.findOne({_id:id});
    res.render("./admin/pages/roles/edit.pug",{
        pageTitle:"Trang chinh sua",
        record:record
    })
}
module.exports.editPatch= async (req,res)=>{
    // console.log(req.body);
    await Role.updateOne({_id:req.params.id},req.body);
    res.redirect("back");
}

module.exports.permission= async (req,res)=>{
    let find={
        deleted:false
    }
    const records= await Role.find(find);
    res.render("./admin/pages/roles/permissions",{
        pageTitle:"Phan quyen",
        records:records
    })
}
module.exports.permissionPatch= async (req,res)=>{
    const permissions = JSON.parse(req.body.permissions);
    for (const item of permissions) {
        await Role.updateOne({_id:item.id},{permission:item.permission})
    }
    res.redirect("back")
}