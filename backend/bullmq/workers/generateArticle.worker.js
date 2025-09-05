const {Worker} = require('bullmq');
const connection = require('../redis.config');
const axios = require('axios')

console.log("Worker is runing")

const worker = new Worker('article-titles',async(job) => {
    console.log("Processing the current job with job data",job.data)
    
    try {
        const response =await axios.post("http://localhost:8000/generateArticle",job.data)
        console.log(`Job ${job} processed by python microservice`)
        return response.data
    } catch (error) {
        console.log("Jobs failed with error",error)
        throw error
    }

},{connection})



//add event listeners for the bullmq

worker.on("completed",(job,result) => {
    console.log(`Job ${job} completed with result:`,result)
})

worker.on("failed",(job,err) => {
    console.log(`Job ${job} failed :`,err.message)
})
