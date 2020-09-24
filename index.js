/////////////////////////////////////////////////////////////////
// Author: Kate Baldwin
// Course: IT122  
// File: index.js
// Created: 07/04/2020
/////////////////////////////////////////////////////////////////

'use strict'
const express = require("express");
const exphbs = require('express-handlebars');
const bodyParser = require("body-parser");
const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); // set location for static files
app.use(bodyParser.urlencoded({extended: true})); // parse form submissions
app.use(bodyParser.json());
app.use('/api', require('cors')()); // set Access-Control-Allow-Origin header for api route
//app.use((err, req, res, next) => {console.log(err);});

app.engine('handlebars', exphbs({defaultLayout: false}));
app.set("view engine", "handlebars");

//const carItems = Car.getAll(); // get all of the cars items

const Car = require('./models/cars.js'); // reference the information in the data.js file

// view homepage route - display cars from mongo db
app.get('/', (req, res, next) => {
  return Car.find({}).lean()
    .then((cars) => {
        res.render('home', { cars });
    })
    .catch(err => next(err));
});

//view detail route - display the details of the car from the mongo db record
app.get('/detail', (req, res) => {
  const model = req.query.model; //query the car that was clicked on  
  Car.findOne({model: model}).lean()
    .then((cars) => {
      res.render('detail', { model: model, details: cars });
    })
    .catch(err => next(err));
});

app.get('/delete', (req, res) => {
  const model = req.query.model; 
  Car.deleteOne({model: model}).lean()
    .then((cars) => {
       res.send(cars.deletedCount > 0 ? model + ' deleted' : model + ' not in database');
    })
    .catch(err => next(err));
}); 

//////////////////////////////
//     WEEK 5 API ROUTES    //
//////////////////////////////

//create an API route to get all items
app.get('/api/cars', (req, res, next) => {
  return Car.find({}).lean()
    .then((cars) => {
        res.json(cars);
    })
    .catch(err => { return res.status(500).send('Error occurred: database error.')} );
});

//create API route to get a single item
app.get('/api/cars/:model', (req, res) => {
  const model = req.params.model; 
  Car.findOne({model: model}).lean()
    .then((cars) => {
      if (cars == null) {
        return res.status(400).send('Error occurred: model not found');
      }
      else {
        res.json(cars);
      }
    })
    .catch(err => { return res.status(500).send('Error occurred: database error.')} );
});

//create an API route to delete an item
app.get('/api/delete/:model', (req, res) => {
  const model = req.params.model; 
  Car.findOneAndDelete({model: model}).lean()
    .then((cars) => {
      if (cars == null) {
        return res.status(400).send('Error occurred: model not found');
      }
      else {
        res.json(cars);
      }
    })
    .catch(err => { return res.status(500).send('Error occurred: database error.')} );
}); 

//create an API route to add/update an item (post request)  
app.post('/api/cars/:model', (req, res) => {
  if(!req.body){
    return res.status(400).send('Request body is missing');
  }
  const model = req.params.model;
  Car.findOneAndUpdate({model: model}, req.body, {upsert:true} ).lean()
    .then((cars) => {
      res.json(cars);
    })
    .catch(err => { return res.status(500).send('Error occurred: database error.')} );
}); 

////////////////////////////////
//   WEEK 6 - REACT & SPA's   //
////////////////////////////////

//create a route to the home page that uses REACT
app.get('/home', (req, res, next) => {
  return Car.find({}).lean()
  .then((cars) => {
      res.render('home_react', {cars: JSON.stringify(cars)});
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

 