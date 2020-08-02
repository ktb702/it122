/////////////////////////////////////////////////////////////////
// Author: Kate Baldwin
// Course: IT122  (Week 3 - Quality Assurance)
// File: carsTest.js
// Created: 07/13/2020
// Desc: Create a test script file in your /test folder, with Mocha+Chai test cases for your 'getItem', 
//    'addItem' and 'deleteItem' methods. Create tests for both success & failure conditions. 
//     All six test cases should pass when run via Mocha.     
/////////////////////////////////////////////////////////////////

const expect = require("chai").expect;
const car = require("../data.js"); //modules being tested

describe('Testing Cars Module (data.js)', () => {
    //test cases for success and failure conditions for getItem method
    describe("get car item", () => {
        it("returns requested car", () => {
            const result = car.getItem("Prius");
            expect(result.car).to.deep.equal({year: 2016, make:"Toyota", model: "Prius", color: "silver"});
          });
          
          it("fails with invalid car", () => {
            const result = car.getItem("monster truck");
            expect(result.status).to.be.false;
          });
    });

    //test cases for success and failure conditions for addItem method
    describe("add car", () => {
        it("should add the new car to the array", () => {
            let newCar = {
                year: 2014,
                make: "Jeep",
                model: "Wrangler",
                color: "green"
            };
            const result = car.addItem(newCar);
            expect(result.status).to.be.true;
          });

          it("fails if data already exists in array", () => {
            let newCar = {
                year: 2010,
                make: "Ford",
                model: "Mustang",
                color: "red"
            }; 
            const result = car.addItem(newCar);
            expect(result.status).to.be.false;
          });
    }); 

    //test cases for success and failure conditions for deleteItem method
    describe("delete car", () => {
        it("should delete a car from the array", () => {
            let result = car.deleteItem("Cooper");
            expect(result.status).to.be.true;
        });

        it("fails if data doesn't exist in the array", () => {
          let result = car.deleteItem("Ferrari");
          expect(result.status).to.be.false;
      });
    });
   });




