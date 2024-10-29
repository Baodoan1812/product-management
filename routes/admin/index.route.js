const productRoutes = require("./products.route")
const dashboardRoutes =require("./dashboard.route")
const productCategoryRoute= require("./product-category.route");
const rolesRoute= require("./roles.route");
const accountsRoute=require("./accounts.route");
const authRoute= require("./auth.route");
const myAccountRoute= require("./my-account.route");
const userRoute= require("./user.route");
const systemConfig= require("../../config/system");
const middlewareAuth= require("../../middlewares/admin/auth.middleware");
module.exports =(app)=>{
    const PATH_ADMIN=systemConfig.prefixAdmin;
    app.use(PATH_ADMIN+"/dashboard",
        middlewareAuth.auth,
        dashboardRoutes)
    app.use(PATH_ADMIN+"/products",middlewareAuth.auth,productRoutes)
    app.use(PATH_ADMIN+'/product-category',middlewareAuth.auth,productCategoryRoute);
    app.use(PATH_ADMIN+'/roles',middlewareAuth.auth,rolesRoute);
    app.use(PATH_ADMIN+'/accounts',middlewareAuth.auth,accountsRoute);
    app.use(PATH_ADMIN+'/auth',authRoute);
    app.use(PATH_ADMIN+'/my-account',middlewareAuth.auth,myAccountRoute);
    app.use(PATH_ADMIN+'/users',middlewareAuth.auth,userRoute);

}