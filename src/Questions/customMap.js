const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function getUserId(id, callback) {
  const randomTimeout = Math.floor(Math.random() * 100) + 200;

  setTimeout(() => {
    callback(`User-${id}`);
  }, randomTimeout);
}

function mapLimit(input, limit, iteratorFn, callback) {
  let index = 0;
  let completedTasks = 0;

  const finalResult = [];

  function postComplitionCallback(activeIndex, output) {
    finalResult[activeIndex] = output;
    completedTasks++;

    if (completedTasks === input.length) {
      return callback(finalResult);
    }

    if (index < input.length) {
      iteratorFn(input[index], postComplitionCallback.bind(null, index));
      index++;
    }
  }

  while (index < limit) {
    iteratorFn(input[index], postComplitionCallback.bind(null, index));

    index++;
  }
}

// Max we can make n calls defined in limit
mapLimit(array, 3, getUserId, (allResult) => {
  console.log("Output Result:", allResult);
});

function maxLimitOptimized(input, limit, fn) {
  return new Promise((resolve, reject) => {
    const finalResult = [];

    let index = 0;
    let activeCount = 0;

    function processNext() {
      while (activeCount < limit && index < input.length) {
        const currentIndex = index++;
        activeCount++;

        Promise.resolve(fn(input[currentIndex]))
          .then((result) => (finalResult[currentIndex] = result))
          .catch(reject)
          .finally(() => {
            activeCount--;
            processNext();

            if (index >= input.length && activeCount === 0)
              resolve(finalResult);
          });
      }
    }

    processNext();
  });
}

function asyncOperation(input) {
  return new Promise(
    (resolve) => setTimeout(() => resolve(input * 2)),
    Math.random() * 1000,
  );
}

function syncOperation(input) {
  return input * 2;
}

maxLimitOptimized(array, 3, asyncOperation)
  .then((result) => console.log("Async", result))
  .catch((error) => console.error(JSON.sringify(error.message), null, 2));

maxLimitOptimized(array, 3, syncOperation)
  .then((result) => console.log("Sync", result))
  .catch((error) => console.error(JSON.stringify(error.message), null, 2));
