const cloudinary = require('../middleware/cloudinary')
const User = require('../models/User')
const Post = require('../models/Post')
const Chat = require('../models/Chat')
const Message = require('../models/Message')

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
            const posts = await Post.find({user: user.id})
            res.render('profileFriend.ejs', {posts: posts, user: user, users: users})
        }catch(err){
            console.log(err)
        }
    },
    getChat: async(req, res)=>{
        try{
            //retrieve user IDs from URL parameters
            const currentUserID = req.user.id
            const pickedUserID = req.params.id
            //get userNames from both users
            const currentUser = await User.findById(currentUserID)
            const pickedUser = await User.findById(pickedUserID)
            //check if chat already exists
            const existingChat = await Chat.findOne({
                $or: [
                    {userOne: currentUserID, userTwo: pickedUserID},
                    {userOne: pickedUserID, userTwo: currentUserID},
                ],
            })
            //if it exists - render chat.ejs
            if(existingChat){
                //find all messages from that chat using ID of the chat
                const messages = await Message.find({chatId: existingChat._id}).sort({createdAt: 'asc'})
                return res.render('chat.ejs', {chat: existingChat, messages: messages, currentUser: existingChat.userOne, pickedUser: existingChat.userTwo})
            }
            //if not - create new chat
            const newChat = new Chat({
                userOne: currentUserID,
                userOneName: currentUser.userName,
                userTwo: pickedUserID,
                userTwoName: pickedUser.userName,
            })
            await newChat.save()
            res.render('chat.ejs', {chat: newChat, currentUser: currentUser, pickedUser: pickedUser})

        }catch(err){
            console.log(err)
        }
    },
    sendMessage: async(req, res)=>{
        try{
            await Message.create({
                chatId: req.params.id,
                sender: req.user.id,
                content: req.body.messageText,
            })
            res.redirect("/chat/"+req.params.id)
        }catch(err){
            console.log(err)
        }
    },
}