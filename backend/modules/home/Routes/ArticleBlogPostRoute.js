const express = require('express')
const {getArtcileBlogPost} = require('../Controllers/ArticleBlogPostController')

const Router = express.Router()

Router.get('/getarticleblogpost',getArtcileBlogPost)

module.exports = Router;