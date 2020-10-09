const express = require('express');
const path = require('path');
const handlebars =require('handlebars');
const exphbs = require('express-handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const bodyparser = require('body-parser');

const server = express();
 
server.use(bodyparser.urlencoded({extended: false}));
server.use(bodyparser.json());


server.get('/', (req,res)=>{
    res.send(`
    <h2>Here is Your Dashboard! </h2>
    <h3>Click here to have access to your 
    <b> <a href ="/user/list"> Subscriptions </a></b>
    </h3>
    `)
});

server.set('views', path.join(__dirname, '/views'));

server.engine('hbs', exphbs({
    handlebars: allowInsecurePrototypeAccess(handlebars),
    extname: 'hbs',
    defaultLayout: 'MainLayout',
    layoutsDir: __dirname + '/views/layouts'
}));

server.set('view engine', 'hbs');      //hbs stands for handlebars

module.exports = server; 