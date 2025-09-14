const { Worker } = require('bullmq');
const connection = require('../redis.config');
const axios = require('axios')
require('dotenv').config()

console.log("Worker is runing")
BASE_PYTHON_URL = process.env.PYTHON_API

const worker = new Worker('article-titles', async (job) => {
    console.log("Processing the current job with job data", job.data)

    try {
        const response = await axios.post(`${BASE_PYTHON_URL}/generateArticle`, job.data)
        console.log(`Job ${job} processed by python microservice`)
        // return response.data
    } catch (error) {
        if (error.response) {
            console.error("Microservice error:", error.response.status, error.response.data);
        } else {
            console.error("Worker error:", error.message);
        }
        throw error;
    }

}, { connection})



//add event listeners for the bullmq

worker.on("completed", (job, result) => {
    console.log(`Job ${job} completed with result:`)
})

worker.on("failed", (job, err) => {
    console.log(`Job ${job} failed :`, err.message)
})
