// In setInterval and setTimeout the context in case of NodeJS is Global and in Browser it  is window and this context can be change by call it desired context

function createSetIntervalPolyfill() {
  let intervalId = 0;
  const intervalMap = {};

  function setIntervalPolyfill(callback, delay = 0, ...args) {
    if (typeof callback !== "function")
      throw new TypeError("Callback must be a function");

    const id = intervalId++;

    function repeat() {
      intervalMap[id] = setTimeout(() => {
        callback(...args);

        if (intervalMap[id]) repeat();
      }, delay);
    }

    repeat();

    return id;
  }

  function clearIntervalPolyfill(intervalId) {
    clearTimeout(intervalMap[intervalId]);
    delete intervalMap[intervalId];
  }

  return { setIntervalPolyfill, clearIntervalPolyfill };
}

const { setIntervalPolyfill, clearIntervalPolyfill } =
  createSetIntervalPolyfill();

let counter = 0;

function callback(a, b, c) {
  console.log("Trigger callback with Args:", a + b + c);
  counter++;

  if (counter >= 3) {
    clearIntervalPolyfill(intervalId);
  }
}

const intervalId = setIntervalPolyfill(callback, 1000, 1, 2, 3);
