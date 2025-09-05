const express = require('express');
const { getOneBlog, getAllBlogs } = require('../Controllers/BlogController');

const router = express.Router();

router.get('/allblogs',getAllBlogs)

router.get('/:id',getOneBlog)

module.exports = router;