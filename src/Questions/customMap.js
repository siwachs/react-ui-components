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
