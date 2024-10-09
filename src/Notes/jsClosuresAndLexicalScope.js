// Closures are a fundamental concept in JavaScript (and many other programming languages) that allow a function to "remember" the environment in which it was created. This means that a closure can access variables from its containing (or outer) function even after that function has finished executing.

// Scopes -> Define how far a variable is accesable in a program. Global, Block, Local, Function and Lexical Scope.

// Lexical Scope -> The inner function has access to variables and parameters defined in scope of its outer function.

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

  inner();
}

outer();
