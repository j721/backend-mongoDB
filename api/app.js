require('../models/db.js');

const express = require('express');
const path = require('path');
const handlebars =require('handlebars');
const exphbs = require('express-handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const bodyparser = require('body-parser');

const userController = require("../controllers/userController");

const app= express();
 
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());


app.get('/', (req,res)=>{
    res.send(`
    <h2>Welcome to User Database! </h2>
    <h3>Click here to have access to the
    <b> <a href ="/user/list"> Database </a></b>
    </h3>
    `)
});

app.set('views', path.join(__dirname, '/views'));

app.engine('hbs', exphbs({
    handlebars: allowInsecurePrototypeAccess(handlebars),
    extname: 'hbs',
    defaultLayout: 'MainLayout',
    layoutsDir: __dirname + '/views/layouts'
}));

app.set('view engine', 'hbs');      //hbs stands for handlebars

app.use("/user", userController);

module.exports = app; 