const express = require('express')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const flash = require('express-flash')
const cookieParser=require('cookie-parser');
const session=require('express-session');
const app = express()
require('dotenv').config()
const port = process.env.PORT

app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: false }))

const database= require("./config/database")
database.connect();

const systemConfig = require("./config/system");

app.locals.prefixAdmin= systemConfig.prefixAdmin

app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

app.use(express.static('public'))
const route=require("./routes/client/index.route")
const routeAdmin =require("./routes/admin/index.route")
app.set('views', './views');
app.set('view engine', 'pug');
routeAdmin(app);
route(app)

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})