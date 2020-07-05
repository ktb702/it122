/////////////////////////////////////////////////////////
// Author: Kate Baldwin
// Course: IT122  (Week 1 - Node.js Up and Running)
// File: index.js
// Created: 07/04/2020
// Desc: First steps toward a working server application
/////////////////////////////////////////////////////////

// require directive is used to load the http module and store the returned HTTP instance into a http variable
const http = require("http"); 

// reference the information in the data.js file
const car = require('./data.js');
// get all of the cars items 
let carItems = car.getAll();

// create server instance and bind it to port 3000
http.createServer((req,res) => {
  const path = req.url.toLowerCase();
  switch(path) {
    // If home page, display welcome message and array length of cars
    case '/':
      const homePage = `Welcome! \n I've exported an array of cars that has a length of ${carItems.length}`;
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
}).listen(process.env.PORT || 3000);