var express= require('express');
var morgan= require('morgan');
var mongoose= require('mongoose');
var bodyParser= require('body-parser');
var ejs=require('ejs');
var engine = require('ejs-mate');


var app= express();
var User= require('./models/user');

mongoose.connect('mongodb://admin:sid1234@ds119445.mlab.com:19445/ecommerce',function(err){
    if(err){
        console.log(err);
    }else{
        console.log("Connected to the database");
    }
});
// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.engine('ejs', engine);
app.set('view engine', 'ejs');



app.post('/create-user', function(req,res){
    var user=new User();
    user.profile.name=req.body.name;
    user.password = req.body.password;
    user.email= req.body.email;
    user.save(function(err){
        if(err) return next(err);
        res.json('Successfully Created a new user');
    });
});

app.get('/',function(req,res){
    res.render('home');
});


app.listen(3000,function(err) {
    if(err) throw err;
    console.log("Server is running on port 3000");
});