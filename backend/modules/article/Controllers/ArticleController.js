const express = require('express');
const Article = require('../Models/ArticleSchema');


const getOneArticle = async (req,res) => {
     const {id} = req.params;
    //  console.log("************",id)
    try {
        const data = await Article.findById(id)
        if(!data){
            return res.send("No article found")
        }
        res.json(data)   
    } catch (error) {
        res.send("No article Available")
        
    }
}

const getAllArticles = async (req,res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const lastId = req.query.lastId;

        const query = lastId ? {_id:{$gt:lastId}} : {};
        const data = await Article.find(query).sort({_id:1}).limit(limit).select("title introduction")
        if(!data || data.length === 0){
            return res.json({articles:[],hasMore:false})
        }
        res.json({
            articles:data,
            lastId:data[data.length - 1]._id,
            hasMore: data.length === limit
        }) 
    } catch (error) {
        res.send("Error in fetching articles")
        
    }
};

module.exports = {getOneArticle,getAllArticles};