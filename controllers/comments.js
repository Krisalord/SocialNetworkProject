const Comment = require("../models/Comment")
const Post = require("../models/Post")

module.exports = {
    createComment: async(req, res)=>{
        try{
            await Comment.create({
                comment: req.body.comment,
                likes: 0,
                post: req.params.id,
                userCreated: req.user.userName,
                user: req.user.id,
                usersLiked: "",
            })
        console.log("Comment has been added!")
        res.redirect("/post/"+req.params.id)
        }catch(err){
            console.log(err)
        }
    },
    likeComment: async(req, res)=>{
        try{
            const comment = await Comment.findByIdAndUpdate(
            req.params.commentId,
            {$inc:{likes: 1},$push:{usersLiked: req.user.id}},
            ).populate("post")
            console.log('Comment Liked')
            res.redirect(`/post/${comment.post._id}`)
        } catch(err){
            console.log(err)
        }
    },
    deleteComment: async(req, res)=>{
        try{
            let comment = await Comment.findById({_id: req.params.id})
            await Comment.remove({_id: req.params.id})
            res.redirect(`/post/${comment.post}`)
        }catch(err){
            res.redirect("/profile")
        }
    },
}