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
            //users - all users from DB to friend list (to be changed)
            const users = await User.find({_id: {$ne: req.user._id}})
            const posts = await Post.find({user: req.user.id}).sort({createdAt: 'desc'}).populate('user', ['userName', 'profilePic'])
            res.render('profile.ejs', {posts: posts, user: req.user, users: users})
        }catch(err){
            console.log(err)
        }
    },
    getFriendProfile: async(req, res)=>{
        try{
            //users - all users from DB to friend list (to be changed)
            const users = await User.find({_id: {$ne: req.user._id}})
            const user = await User.findById(req.params.id)
            const posts = await Post.find({user: user.id}).populate('user', ['userName', 'profilePic'])
            res.render('profileFriend.ejs', {posts: posts, user: user, users: users})
        }catch(err){
            console.log(err)
        }
    },
<<<<<<< HEAD
    getSearch: async(req, res)=>{
        try{
            const foundUsers = await User.find().lean()
            res.render('search.ejs', {foundUsers: foundUsers})
        }catch(err){
            console.log(err)
        }
    },
    executeSearch: async(req, res)=>{
        try{
            const search_query = req.query.search_query
            const foundUsers = await User.find({userName: search_query})
            res.render('search.ejs', {foundUsers: foundUsers})
        }catch(err){
            console.log(err)
        }
    },
    addFriend: async(req, res)=>{
        try{
            console.log(req.user.id)
            console.log(req.params.id)

            const updateUser = await User.findOneAndUpdate({_id: req.user.id }, { $push: { friendList: req.params._id } }, { new: true })

            console.log(updateUser)
            res.redirect('/profile')
        } catch(err){
            console.log(err)
        }
    },
=======
>>>>>>> 52a90eefe00608993dd98a38e41a105093b6b0d2
}