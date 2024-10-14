"use strict";
// Important: this refer to Global This if reduce called with call method without strict with strict it refer to undefined only if context not provide

function reduce(callback, initialValue) {
  if (this === null || this === undefined) {
    throw new TypeError(
      "Array.prototype.reduce cannot be called on null or undefined",
    );
  }

  if (!callback || typeof callback !== "function")
    throw new TypeError(`${callback} is not a function`);

  console.log("No of Args is = ", arguments.length);
  if (this.length === 0)
    if (arguments.length < 2)
      throw new TypeError("Reduce of emty array with no initialValue");
    else if (arguments.length === 2) {
      return initialValue;
    }

  let k = 0;
  let acc = initialValue;

  if (arguments.length < 2) {
    acc = this[k++];
  }

  while (k < this.length) {
    if (Object.hasOwn(this, k)) acc = callback(acc, this[k], k, this);

    k++;
  }

  return acc;
}

module.exports = reduce;
