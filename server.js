'use strict'

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');

var db = require('./config/db'); // Config files
var port = process.env.PORT || 8080; // set port

mongoose.connect(db.url); // connect to mongoDB database

app.use(bodyParser.json()); //parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in request

app.use(express.static(__dirname + '/public')); // set static files location
app.use('/scripts', express.static(__dirname + '/node_modules')); // to access files from node_modules

// routes
require('./app/routes')(app); // configure our routes

// run app at localhost:8080
app.listen(port);

// shoutout to the user                     
console.log('App listening on port ' + port);

// expose app
exports = module.exports = app;