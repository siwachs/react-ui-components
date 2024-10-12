// A polyfill in JavaScript is a piece of code that provides modern functionality to older browsers that do not support it natively. Essentially, it allows developers to use newer JavaScript features while ensuring compatibility across various environments.

// Array.prototype.reduce();
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const total = array.reduce(sum, 0);

function sum(acc, value, index, arr) {
  console.log(index, arr);
  return acc + value;
}

console.log(total);
