/////////////////////////////////////////////////////////
// Author: Kate Baldwin
// Course: IT122  (Week 2 - Express Yourself)
// File: data.js
// Created: 07/04/2020
// Desc: Define an array with at least 5 items and export
/////////////////////////////////////////////////////////

// create an array of car objects/items
let cars = [
    {year: 2009, make: 'Audi',   model: 'A4',      color: 'black'},
    {year: 2016, make: 'Toyota', model: 'Prius',   color: 'silver'},
    {year: 2018, make: 'Mini',   model: 'Cooper',  color: 'purple'},
    {year: 2012, make: 'Subaru', model: 'Outback', color: 'blue'},
    {year: 2010, make: 'Ford',   model: 'Mustang', color: 'red'},
];

// export method that will return all array (cars) items
exports.getAll = () => {
    return cars;
}

exports.getCar = model => {
    const car = cars.find(cars => cars.model === model);
    return car;    
}