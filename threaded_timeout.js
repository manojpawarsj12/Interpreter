const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
  threadId,
} = require("worker_threads");

if (isMainThread) {
  module.exports = (img) =>
    new Promise((resolve, reject) => {
      const worker = new Worker(__filename, {
        workerData: img,
      });
      worker.on("message", resolve);
      worker.on("error", reject);
      worker.on("exit", (code) => {
        if (code !== 0)
          reject(new Error(`Worker stopped with exit code ${code}`));
      });
    });
} else {
  console.log(`thread id: ${threadId} Starting with timeout ${workerData} milliseconds`);

  function myTimeout(milisecs) {
    var nowT = Date.now();
    while (Date.now() < nowT + milisecs) {
      continue;
    }
  }
  myTimeout(workerData);
  parentPort.postMessage(workerData);
}
