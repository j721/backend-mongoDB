const express = require('express')
const path = require('path')
const handlebars =require('handlebars')
const exphbs = require('express-handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const bodyparser = require('body-parser')

var app = express()
 
app.use(bodyparser.urlencoded{extended: false})
app.use(bodyparser.json())

app.listen(3000, ()=>{
    console.log('server running on port 3000')
})