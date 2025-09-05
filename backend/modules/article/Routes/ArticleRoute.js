const express = require('express');
const { getOneArticle, getAllArticles } = require('../Controllers/ArticleController');

const router = express.Router();

router.get('/allarticles',getAllArticles)

router.get('/:id',getOneArticle)

module.exports = router;