const express = require('express')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const flash = require('express-flash')
const cookieParser=require('cookie-parser');
const session=require('express-session');
const moment= require("moment");
const path = require('path');
const http= require('http');
const { Server }= require('socket.io');

const app = express()
require('dotenv').config()
const port = process.env.PORT
// tao socket
const server= http.createServer(app);
const io= new Server(server);
global._io= io;
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: false }))

const database= require("./config/database")
database.connect();

const systemConfig = require("./config/system");

app.locals.prefixAdmin= systemConfig.prefixAdmin
app.locals.moment=moment;

app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

app.use(express.static(`${__dirname}/public`))
const route=require("./routes/client/index.route")
const routeAdmin =require("./routes/admin/index.route")
app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');
route(app)
routeAdmin(app);
app.get("*",(req,res)=>{
  res.render("client/pages/errors/404")
})
server.listen(port, () => {
  console.log(`app listening on port ${port}`)
})