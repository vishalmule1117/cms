const express = require('express');
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

mongoose.connect('mongodb://localhost:27017/cms',{useUnifiedTopology:true,useNewUrlParser:true}).then(db=>{
    console.log('Mongo Connected')
}).catch(error=> console.log("Could Not Connect" + error));

app.use(express.static(path.join(__dirname, 'public')));

// Set  View Engine
app.engine('handlebars', exphbs({handlebars:allowInsecurePrototypeAccess(Handlebars),defaultLayout: 'admin'}));
app.set('view engine', 'handlebars');


// body parser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


//Load Routs
const home = require('./routes/home/index');
const admin = require('./routes/admin/index');
const  posts = require('./routes/admin/posts');

// USe Routs
app.use('/', home);
app.use('/admin', admin);
app.use('/admin/posts', posts);

app.listen(4500, ()=> {
    console.log(`Active On Port 4500`)
});
