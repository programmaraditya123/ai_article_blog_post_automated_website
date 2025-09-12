const post = require('../../posts/Models/PostSchema')
const article = require('../../article/Models/ArticleSchema')
const blog = require('../../blogs/Models/BlogSchema')

const getArtcileBlogPost = async (req,res) => {
    try {
        const articles = await article.find({}).sort({_id:-1}).limit(10).select("title introduction")
        const blogs = await blog.find({}).sort({_id:-1}).limit(10).select("title introduction")
        const posts = await post.find({}).sort({_id:-1}).limit(10).select("title body")
        res.json({
            articles:articles,
            blogs:blogs,
            posts:posts
        })
        
    } catch (error) {
        console.log("Error in fetching Articles Blog Posts",error)
        
    }
};

module.exports = {getArtcileBlogPost}