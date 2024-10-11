// new operator in JS

let thisRef;

const person = { name: "New Name", age: 32 };
const otherPerson = { name: "Other Name", age: 89 };
console.log(person);
console.log(otherPerson);

// Any function in JS is defined a entity ot type is refer as constructor function and it help to create instance with new operator
function Person(name, age) {
  if (!new.target) throw new Error("Invoke with new keyword.");

  // New Empty objet created and assign to "this"
  // this = {}

  // Modify this by execute fnc body
  this.name = name;
  this.age = age;

  thisRef = this;

  // Premitive are number, string, bool
  // Finally Implicit this return primitive return. if no value returned not premitive return array, object, function.

  // No premitive return that return value became new returned value and this ref not equal to "this"
  // return {};

  // On Premitive return thisRef is going to be "this"
  return 0;
}

Person.prototype.callMethod = function () {
  console.log(this.name);
  console.log(this.age);
};

const personObj = new Person("Name", 90);
console.log(personObj);
personObj.callMethod();

console.log(
  "Same Proto",
  Object.getPrototypeOf(personObj) === Person.prototype,
);
console.log("Person Object is equal to thisRef", personObj === thisRef);
