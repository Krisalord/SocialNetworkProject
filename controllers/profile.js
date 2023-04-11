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
}