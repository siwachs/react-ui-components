// Design and implement an TaskRunner utility that processes asynchronous tasks with a maximum concurrency limit.
// Ex: We have 5 task and given limit is 3 so we can oly run 3 task at a time

function createTask(id, delay) {
  return () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Task ${id} is completed.`);
        resolve(`Result of Task ${id} is resolved.`);
      }, delay);
    });
  };
}

// NOTE: In Event loop if two methods execute first it is hard to predict which are going to execute first it depend on factors -> The wait time does not need to execute method whenever timout finished it is minimum wait time.
// Means it could eexecute after that minimum timout depending on what is eventloop doing at that time

class TaskRunner {
  constructor(concurrency) {
    this.concurrency = concurrency;
    this.runningTasks = 0;
    this.queue = [];
  }

  async push(task) {
    if (this.runningTasks < this.concurrency) await this.execute(task);
    else this.queue.push(task);
  }

  async execute(task) {
    this.runningTasks++;

    try {
      await task();
    } catch (error) {
      console.log(JSON.stringify(error.message, null, 2));
    } finally {
      this.runningTasks--;

      if (this.queue.length && this.runningTasks < this.concurrency) {
        const nextTask = this.queue.shift();

        this.execute(nextTask);
      }
    }
  }
}

const taskRunner = new TaskRunner(3);
taskRunner.push(createTask(1, 2000));
taskRunner.push(createTask(2, 1000));
taskRunner.push(createTask(3, 1200));
taskRunner.push(createTask(4, 1000));
taskRunner.push(createTask(5, 1600));
