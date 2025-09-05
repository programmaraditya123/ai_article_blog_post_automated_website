const express = require('express');
const { getAllPosts, getOnePost } = require('../Controllers/PostControllers');

const Router = express.Router()

Router.get("/allposts",getAllPosts)

Router.get("/:id",getOnePost)

module.exports = Router;