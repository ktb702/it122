/////////////////////////////////////////////////////////////////
// Author: Kate Baldwin
// Course: IT122  
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

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); // set location for static files
app.use(bodyParser.urlencoded({extended: true})); // parse form submissions

app.engine('handlebars', exphbs({defaultLayout: false}));
app.set("view engine", "handlebars");

//const carItems = Car.getAll(); // get all of the cars items

const Car = require('./models/cars.js'); // reference the information in the data.js file

// view homepage route - display cars from mongo db
app.get('/', (req, res, next) => {
  return Car.find({}).lean()
    .then((cars) => {
        res.render('home', { cars });
        console.log(cars);
    })
    .catch(err => next(err));
});

//view detail route - display the details of the car from the mongo db record
app.get('/detail', (req, res) => {
  const model = req.query.model; //query the car that was clicked on  
  Car.findOne({model: model}).lean()
    .then((cars) => {
      res.render('detail', { model: model, details: cars });
      console.log(cars);
    })
    .catch(err => next(err));
});

//delete route
app.get('/delete', (req, res) => {
  const model = req.query.model; 
  Car.deleteOne({model: model}).lean()
    .then((cars) => {
       res.send(cars.deletedCount > 0 ? model + ' deleted' : model + ' not in database');
    })
    .catch(err => next(err));
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

 