// Queue for titles
const {Queue} = require('bullmq');
const connection = require('../redis.config');

const articleTitleQueue = new Queue('article-titles',{connection});


// this function is used to  clear or reset queues
// async function clearJobs() {
//   // Option 1: Wipe out everything in the queue
//   await articleTitleQueue.drain(true); // true = remove all waiting & delayed jobs
//   await articleTitleQueue.clean(0, 1000, 'completed');
//   await articleTitleQueue.clean(0, 1000, 'failed');

//   // Option 2: Nuclear option (drops everything, including repeatable jobs)
// //   await articleTitleQueue.obliterate({ force: true });

//   console.log("All jobs deleted!");
// }
// clearJobs()

module.exports = articleTitleQueue;