const cloudinary = require('../middleware/cloudinary')
const Post = require('../models/Post')
const Comment = require('../models/Comment')
const User = require('../models/User')

module.exports = {
    getProfile: async(req, res)=>{
        try{
            //users - all users from DB to friend list (to be changed)
            const users = await User.find()
            const posts = await Post.find({user: req.user.id})
            res.render('profile.ejs', {posts: posts, user: req.user, users: users})
        }catch(err){
            console.log(err)
        }
    },
    getFeed: async(req, res)=>{
        try{
            const posts = await Post.find().sort({createdAt: 'desc'}).lean()
            res.render('feed.ejs', {posts: posts})
        }catch(err){
            console.log(err)
        }
    },
    getPost: async(req, res)=>{
        try{
            const post = await Post.findById(req.params.id)
            const comments = await Comment.find({post: req.params.id}).sort({createdAt: 'desc'}).lean()
            res.render('post.ejs', {post: post, user: req.user, comments: comments})
        }catch(err){
            console.log(err)
        }
    },
    createPost: async(req, res)=>{
        try{
            const result = await cloudinary.uploader.upload(req.file.path)
            
            await Post.create({
                title: req.body.title,
                image: result.secure_url,
                cloudinaryId: result.public_id,
                caption: req.body.caption,
                likes: 0,
                user: req.user.id,
                usersLiked: "",
            })
            console.log('Post has been created!')
            res.redirect('/profile')
        }catch(err){
            console.log(err)
        }
    },
    likePost: async(req, res)=>{
        try{
            await Post.findOneAndUpdate({_id: req.params.id},{$inc:{likes: 1},$push:{usersLiked: req.user.id}})
            console.log('Likes +1!')
            res.redirect(`/post/${req.params.id}`)
        }catch(err){
            console.log(err)
        }
    },
    deletePost: async(req, res)=>{
        try{
            let post = await Post.findById({_id: req.params.id})
            // delete all comments related to the post
            await Comment.deleteMany({post: post._id})
            // delete cloudinary image
            await cloudinary.uploader.destroy(post.cloudinaryId)
            await Post.remove({_id: req.params.id})
            console.log('Deleted Post')
            res.redirect('/profile')
        }catch(err){
            res.redirect('/profile')
        }
    }
}