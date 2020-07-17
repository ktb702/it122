/////////////////////////////////////////////////////////////////
// Author: Kate Baldwin
// Course: IT122  (Week 2 - Express Yourself)
// File: index.js
// Created: 07/04/2020
// Desc: Update the first week's assignment with Express syntax
//    and basic templates.
/////////////////////////////////////////////////////////////////

'use strict'
const express = require("express");
const exphbs = require('express-handlebars');
const bodyParser = require("body-parser")
const app = express();
const car = require('./data.js'); // reference the information in the data.js file

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); // set location for static files
app.use(bodyParser.urlencoded({extended: true})); // parse form submissions

app.engine('handlebars', exphbs({defaultLayout: false}));
app.set("view engine", "handlebars");

const carItems = car.getAll(); // get all of the cars items

// view homepage
app.get('/', (req, res) => {
  res.type('text/html');
  res.render('home', {car: carItems});
 });

 // view detail page
 app.get('/detail', (req, res) => {
  const model = req.query.model;
  res.type('text/html');
  res.render('detail', {model: model, details: car.getCar(model)}); 
 });
 
 // view about page
 app.get('/about', (req, res) => {
  const aboutMe = `About Me: \n My name is Kate Baldwin and I am a full time student at Seattle Central studying web development.`;
  res.type('text/plain');
  res.send(`${aboutMe}`);
 });

 // define 404 handler
app.use( (req,res) => {
  res.type('text/plain'); 
  res.status(404);
  res.send('404 Error - Page not found');
 });

 // start the web server
 app.listen(app.get('port'), () => {
  console.log(`Express started`); 
 });

 // CODE FROM ASSIGNMENT # 1 //

/* create server instance and bind it to port 3000
http.createServer((req,res) => {
  const path = req.url.toLowerCase();
  switch(path) {
    // If home page, display welcome message and array length of cars
    case '/':
      const homePage = `Welcome! \n I've imported an array of cars that has a length of ${carItems.length}`;
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end(`${homePage}`);
      break;
    // If about page, display about me information
    case '/about':
      const aboutMe = `About Me: \n My name is Kate Baldwin and I am a full time student at Seattle Central studying web development.`;
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end(`${aboutMe}`);
      break;
    // for any other page, display 404 error message
    default:
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('404 Error - Page not found');
      break;
    }
}).listen(process.env.PORT || 3000); */