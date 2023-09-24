const MIN = 1;
const MAX = 10000;

class Generator {
  static createTaskId(taskIds) {
    let randomNum;

    do {
    // Use Math.floor() to round down to the nearest integer
      randomNum = Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
    } while (taskIds.includes(randomNum));

    return randomNum;
  }
}

module.exports = Generator;
