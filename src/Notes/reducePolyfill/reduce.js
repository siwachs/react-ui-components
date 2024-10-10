"use strict"; // Important otherwise the this refer to Global This if reduce called with call method
// In strict if we call without a specefic context it refer to undefined

function reduce(callback, initialValue) {
  if (this === null || this === undefined) {
    throw new TypeError(
      "Array.prototype.reduce cannot be called on null or undefined",
    );
  }

  if (!callback || typeof callback !== "function")
    throw new TypeError(`${callback} is not a function`);

  console.log("NO of Args is = ", arguments.length);
  if (this.length === 0)
    if (arguments.length < 2)
      throw new TypeError("Reduce of emty array with no initialValue");
    else if (arguments.length === 2) {
      return initialValue;
    }
}

module.exports = reduce;
