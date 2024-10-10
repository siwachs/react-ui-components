/* eslint-disable @typescript-eslint/no-require-imports */
const reduce = require("../reduce");

const sum = (s, v) => s + v;

describe("Error Conditions", () => {
  beforeAll(() => {
    Array.prototype.customReduce = reduce;
  });

  test("Reduce function not trigger on null or undefined", () => {
    function init() {
      // With call method we set context of reduce function to null
      Array.prototype.customReduce.call(null, sum, 2);
    }

    expect(init).toThrow(TypeError);
  });

  test("Check if callback is a function", () => {
    expect(() => [].customReduce()).toThrow(TypeError);
  });

  test("Reduce on empty array with no initialValue", () => {
    expect(() => [].customReduce(sum)).toThrow(TypeError);
  });
});

describe("Reduce Functionality", () => {
  beforeAll(() => {
    Array.prototype.customReduce = reduce;
  });

  test("Invoked on Empty array with initialValue returns initialValue", () => {
    const initialValue = 0;

    expect([].customReduce(sum, initialValue)).toBe(initialValue);
  });
});
