const Post = require('../models/Post')

module.exports = {
    getFeed: async(req, res)=>{
        try{
            const posts = await Post.find().sort({createdAt: 'desc'}).lean()
            res.render('feed.ejs',{posts: posts})
        }catch(err){
            console.log(err)
        }
    }
}