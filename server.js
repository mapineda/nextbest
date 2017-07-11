'use strict'
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var app = express();
var port = 9000
var secureRoutes = express.Router();

//app.use
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/secure-api', secureRoutes);


//secret key
process.env.SECRET_KEY = 'Password#1';

//controllers
var authenticateController = require('./server/controllers/authenticateController');
var dataController = require('./server/controllers/dataController');
//config
var config = require('./server/config/config.js');
config.setConfig();

//connect with mongoose

//routes
app.get('/server/authenticate', authenticateController.authenticate);
app.get('/server/get-data', dataController.getData);

//validation middleware
secureRoutes.use(function(req, res, next) {
  var token = req.body.token || req.headers['token']
  if (token){
    //res.send('We have a token');
    jwt.verify(token, process.env.SECRET_KEY, function(err, decode){
      if(err){
        res.status(500).send('Invalid Token');
      } else {
        next();
      }
    })
  } else {
    res.send('SOS, Please Send A Token');
  }
});

secureRoutes.post('/post-data', dataController.postData);


app.listen(port, function(){
  console.log('server running on' + port);
})
