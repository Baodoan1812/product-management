const productRoutes = require("./products.route")
const dashboardRoutes =require("./dashboard.route")
const productCategoryRoute= require("./product-category.route");
const rolesRoute= require("./roles.route");
const accountsRoute=require("./accounts.route");
const systemConfig= require("../../config/system");

module.exports =(app)=>{
    const PATH_ADMIN=systemConfig.prefixAdmin;
    app.use(PATH_ADMIN+"/dashboard",dashboardRoutes)
    app.use(PATH_ADMIN+"/products",productRoutes)
    app.use(PATH_ADMIN+'/product-category',productCategoryRoute);
    app.use(PATH_ADMIN+'/roles',rolesRoute);
    app.use(PATH_ADMIN+'/accounts',accountsRoute);

}