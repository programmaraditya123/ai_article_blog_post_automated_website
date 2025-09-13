// Queue for titles
const {Queue} = require('bullmq');
const connection = require('../redis.config');

const articleTitleQueue = new Queue('article-titles',{connection});

async function clearCompletedJobs() {
  try {
    // Clear jobs that are "completed"
    const jobs = await articleTitleQueue.clean(0, 1000, 'completed');
    console.log(`🗑 Cleared ${jobs.length} completed jobs`);

    // (Optional) also clear "failed" jobs if you want
    // const failedJobs = await articleTitleQueue.clean(0, 1000, 'failed');
    // console.log(`🗑 Cleared ${failedJobs.length} failed jobs`);
  } catch (err) {
    console.error("❌ Error clearing jobs:", err);
  }
}

// Run cleanup
clearCompletedJobs();


// this function is used to  clear or reset queues
// async function clearJobs() {
//   // Option 1: Wipe out everything in the queue
//   await articleTitleQueue.drain(true); // true = remove all waiting & delayed jobs
//   await articleTitleQueue.clean(0, 1000, 'completed');
//   await articleTitleQueue.clean(0, 1000, 'failed');

//   // Option 2: Nuclear option (drops everything, including repeatable jobs)
//   await articleTitleQueue.obliterate({ force: true });

//   console.log("All jobs deleted!");
// }
// clearJobs()

module.exports = articleTitleQueue;