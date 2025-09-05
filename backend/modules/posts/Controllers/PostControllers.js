const post = require("../Models/PostSchema")

const getOnePost = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await post.findById(id);
        if (!data) {
            return res.send("No posts found")
        }
        return res.json(data)

    } catch (error) {
        console.log("Posts error", error)

    }
}


const getAllPosts = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const lastId = req.query.lastid;

        const query = lastId ? { _id: { $gt: lastId } } : {};
        const data = await post.find(query).sort({ _id: 1 }).limit(limit).select("title")
        if (!data || data.length === 0) {
            return res.json({ posts: [], hasMore: false })
        }
        res.json({
            posts: data,
            lastId: data[data.length - 1]._id,
            hasMore: data.length === limit
        })

    } catch (error) {
        console.log("Posts error", error)


    }
}

module.exports = { getOnePost, getAllPosts }