'use strict'

const cars = require("./cars")

cars.find({}, (err, result) => {
    //output error if it occurs
    if(err){
        console.log(err);
    }
    else{ //otherwise output the array
        console.log(result);
    }
    return
});