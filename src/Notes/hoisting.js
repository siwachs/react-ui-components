// JS Execution -> Execute in 2 Phase.
// Phase 1 -> Parsing ie hoisting
// Phase 2 -> Interpretation where execute parse program line by line

// 1) Variable hoisting
console.log(myVar); // Ref Error

console.log(myVar); // Undefined
var myVar = "Value";
// In hoisting comes in Phase -> Variable declaration then initlize so it first declare then init.

// 2) In Function
var DEFAULT_SIZE = "Medium";

var size = "Large";

function getSize() {
  if (!size) {
    var size = DEFAULT_SIZE;
  }
  return size;
}

console.log("Value of getSize is " + getSize());
console.log("Your size is " + size);
// getSize is going to be Medium and size is Large because still same hoisting use in function getSize

// 3) let and const keyword (They does not Hoist all the are ablove these let const are temporal dead zone)
console.log(myVar);
// Output Ref Error

let myVar = "This is my variable";

// 4) Function Declaration
myFunction();
// Output: Hoisting in Phase 1 and run in Phase 2

// Function Declaration.
function myFunction() {
  console.log("This is my function.");
}

// 5) Function Expression
var myFunction;

myFunction();
// Output : Can not call undefied var Type Error

// Function Expression.

myFunction = function () {
  console.log("This is my function.");
};

// 6) Precedence (Hoisting)
console.log(typeof square);
// Output: Function

var square = "SQUARE";

function square(num) {
  return num * num;
}

console.log(typeof square);
// Output: String
