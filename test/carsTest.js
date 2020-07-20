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

//test cases for success and failure conditions for getItem method
describe('Testing Cars Module (data.js)', () => {
    describe("get car item", () => {
        it("returns requested car", () => {
            const result = car.getItem("Prius");
            expect(result).to.deep.equal({year: 2016, make:"Toyota", model: "Prius", color: "silver"});
          });
          
          it("fails w/ invalid car", () => {
            const result = car.getItem("monster truck");
            expect(result).to.be.undefined;
          });
    });
   });

//test cases for success and failure conditions for addItem method

//test cases for success and failure conditions for deleteItem method
