const cloudinary = require('../middleware/cloudinary')
const User = require('../models/User')
const Post = require('../models/Post')

module.exports = {
    uploadPic: async(req, res)=>{
        try{
            const result = await cloudinary.uploader.upload(req.file.path)
            await User.findOneAndUpdate(
                {_id: req.user._id},
                {
                    $set:{
                        cloudinaryId: result.public_id,
                        profilePic: result.secure_url
                    }
                },
                {new: true}
            )
            res.redirect('/profile')
        }catch(err){
            console.log(err)
        }
    },
    getProfile: async(req, res)=>{
        try{
            //all posts of the current user
            const posts = await Post.find({user: req.user.id}).sort({createdAt: 'desc'}).populate('user', ['userName', 'profilePic'])
            res.render('profile.ejs', {posts: posts, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    getFriendProfile: async(req, res)=>{
        try{
            const user = await User.findById(req.params.id)
            const posts = await Post.find({user: user.id}).populate('user', ['userName', 'profilePic'])
            res.render('profileFriend.ejs', {posts: posts, user: user, currentUser: req.user})
        }catch(err){
            console.log(err)
        }
    },
    getSearch: async(req, res)=>{
        try{
            const foundUsers = await User.find({
                _id:{$ne: req.user._id},
                _id:{$nin: req.user.friendList}
            }).lean()
            const filteredUsers = foundUsers.filter(user => user._id.toString() !== req.user._id.toString())
            res.render('search.ejs', {filteredUsers: filteredUsers})
        }catch(err){
            console.log(err)
        }
    },
    executeSearch: async(req, res)=>{
        try{
            const search_query = req.query.search_query
            const foundUsers = await User.find({userName: search_query})
            res.render('search.ejs', {filteredUsers: foundUsers})
        }catch(err){
            console.log(err)
        }
    }
}