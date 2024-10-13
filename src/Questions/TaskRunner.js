// Design and implement an TaskRunner utility that processes asynchronous tasks with a maximum concurrency limit.
// Ex: We have 5 task and given limit is 3 so we can oly run 3 task at a time

function createTask(id, delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Task ${id} is completed.`);
      resolve(`Result of Task ${id} is resolved.`);
    }, delay);
  });
}

class TaskRunner {
  constructor(concurrency) {}

  push(task) {}
}
