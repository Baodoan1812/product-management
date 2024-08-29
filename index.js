const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT

const database= require("./config/database")
database.connect();

const systemConfig = require("./config/system");

app.locals.prefixAdmin= systemConfig.prefixAdmin

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