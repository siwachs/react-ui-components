function regular() {
  return 0;
}

regular();

// To Arrow function use this syntax if we return a JS Expression not JS statement
const regularArrow = () => 0;
regularArrow();

// With Spred operator
const arrowSpread = (...x) => x.length;
arrowSpread();

// Default value
const defaultValue = (x = 0) => x;
defaultValue();

// Regular VS Arrow Function

// Regular function can instantiate with new keyword
// Arrow function don't have this we get not a constructor error

// Arrow don't even have prototype object

// Context Binding
// Arrow function has no "this" so it does not identify this as context

const object = {
  a: 1,

  print: function () {
    console.log(this.a);
  },
};
object.print();

function regularFunction() {
  console.log(this.a);
}

regularFunction(); // No Binding to any object so it called in global context ie. window

const obj = { a: 1 };
regularFunction.call(obj); // Bind with obj

function outer() {
  console.log(this); // obj

  function inner() {
    console.log(this); // Window object ie global
  }

  inner();
}

outer.call(obj);

// Since arrow treat this as a variable so it resolve lexically
function outerAnother() {
  console.log(this); // obj

  const inner = () => {
    console.log(this); // obj
  };

  inner();
}

outerAnother.call(obj);
