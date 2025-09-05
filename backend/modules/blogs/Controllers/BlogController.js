const blog = require('../Models/BlogSchema')

const getOneBlog = async(req,res) =>{
    const {id} = req.params;
    try {
        const data = await blog.findById(id)
        if(!data){
            return res.send("No blogs found")
        }
        res.json(data)
        
    } catch (error) {
        console.log("Blog error",error)
        
    }

}

const getAllBlogs = async(req,res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const lastId = req.query.lastId;

        const query = lastId ? {_id:{$gt:lastId}} : {};
        const data = await blog.find(query).sort({_id:1}).limit(limit).select("title introduction")
        if(!data || data.length === 0){
            return res.json({blogs:[],hasMore:false})
        }
        res.json({
            blogs:data,
            lastId:data[data.length -1]._id,
            hasMore: data.length === limit
        })
    } catch (error) {
        console.log("blogs error",error)
        
    }
};

module.exports = {getOneBlog,getAllBlogs}