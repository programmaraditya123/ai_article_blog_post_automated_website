// when python microservice sends titles ---> express adds them to article-content queue

const express = require('express')
router = express.Router();
const articleTitleQueue = require('../queues/articleTitle.queue');

router.post('/titles',async(req,res) => {
    const {titles} = req.body; //array of titles from python microservice
    console.log("9999999999",{titles})
    
 
    const jobs = titles["topics"].map((title) => ({
        name:'title',
        data :{
            title:title.title,
            type:title.type
        }
    }))
    const addedJobs =await articleTitleQueue.addBulk(jobs);
    res.json({
        message:'Titles added to  queue',
        jobIds:addedJobs.map((j) => j.id)
    })
})

router.get('/titlelist',(req,res) => {
    res.send("here  is the article list")
})

module.exports = router;