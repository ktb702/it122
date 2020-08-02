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

// export method that returns full data about the requested item
exports.getItem = model => {
    const car = cars.find(cars => cars.model === model); 
    if (car === undefined){
        return {status: false, message: "car does not exist"};
    }
    else{
        return {status: true, message:"car found in array", car: car};
    }
}

// export method that adds a new item to the data array, if it doesn't already exist
exports.addItem = (newCar) => {
    let carIndex = cars.findIndex(cars => cars.model === newCar.model);
    if(carIndex != -1) { 
        return {status: false, message: "car already exists"};
    }
    else{ //if it doesn't already exist, add it to the array
        cars.push(newCar);
        return {status: true, message: "new car successfully added to the array"};
    }
} 

//export method that deletes the requested item
exports.deleteItem = model => {
    let carIndex = cars.findIndex(cars => cars.model === model);
    if(carIndex != -1) {
        cars.splice(carIndex, 1);
        return {status: true, message: "car successfully deleted from the array"};
    }
    return {status: false, message: "car does not exist in the array"}
    
}
