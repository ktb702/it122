//////////////////////////////////////////////////////////////////////////////////
// Author: Kate Baldwin
// Course: IT122  (Week 4 - Database Integration)
// File: cars.js
// Created: 07/23/2020
// Desc: create a data model that: connects to your database,
//   defines a data schema, and exports your data model for use by other scripts,
//////////////////////////////////////////////////////////////////////////////////

const mongoose = require("mongoose");
const credentials = require("../models/credentials")

// remote db connection settings. For security, connectionString should be in a separate file not committed to git

// local db connection settings (can use remote or local but not both)
// const ip = process.env.ip || '127.0.0.1';
// const connectionString = 'mongodb://' +ip+ '/<DB_NAME>';

mongoose.connect(credentials.connectionString, { dbName: 'sccprojects', useNewUrlParser: true, useUnifiedTopology: true }); 

mongoose.connection.on('open', () => {
  console.log('Mongoose connected.');
});
 
// define cars model in JSON key/value pairs
// values indicate the data type of each key
const mySchema = mongoose.Schema({
 cars: { type: String, required: true },
 year: Number,
 make: String,
 model: String,
 color: String
}); 

module.exports = mongoose.model('cars', mySchema);