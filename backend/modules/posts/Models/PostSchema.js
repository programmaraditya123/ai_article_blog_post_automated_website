const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title:{
        type:String
    },
    body:{
        type:String
    },
    hashtags:{
        type:[String]
    }
})

module.exports = mongoose.model('post',postSchema)