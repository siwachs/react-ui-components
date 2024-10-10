// Closures are a fundamental concept in JavaScript (and many other programming languages) that allow a function to "remember" the environment in which it was created. This means that a closure can access variables from its containing (or outer) function even after that function has finished executing.

// Scopes -> Define how far a variable is accesable in a program. Global, Block, Local, Function and Lexical Scope.

// Lexical Scope -> The inner function has access to variables and parameters defined in scope of its outer function.

// Note to FInd a Varable it goes Up from its Lexical Scope and move UP untill we get global Lexical scope after that global lexical scope refer to null reference error or undefined error

function outer() {
  const x = 1;

  function inner() {
    const exec = true;
    if (exec) {
      console.log(x);
    }

    function innerInner() {
      const y = 2;
      if (exec) {
        console.log(y);
        console.log(x);
      }
    }

    innerInner();
  }

  outside();
  inner();
}

function outside() {
  console.log("Outside Function Trigger");

  //NOTE: In here it try to look in its parent Lexical Env which is diff from outer Fuction Hence it not Work due to different Lexical Env
  // Ref Error because for a inner function to have access to outer function scope it has to be defined within outer function
  // console.log(`Printing x from outside ${x}`);
}

outer();

// It Preserve the value we passed in var sum
function makeAdder(x) {
  let sum = x || 0;

  return function (y) {
    sum = sum + y;
    return sum;
  };
}

const adder = makeAdder(10);
console.log(adder(1)); // 11
console.log(adder(3)); // 14

// NOTE: Real life usecase
// Publisher Subscriber Design Pattern
// Its a framwork to exchange messages between publisher and subscriber.
// A Publisher has multiple subscriber and it can notify change to all its subscribers
// Other are Higher Order Function
