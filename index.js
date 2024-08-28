const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT

const database= require("./config/database")
database.connect();

app.use(express.static('public'))
const route=require("./routes/client/index.route")

app.set('views', './views');
app.set('view engine', 'pug');

route(app)

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})