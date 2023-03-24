const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    comment:{
        type: String,
        required: true,
    },
    likes:{
        type: Number,
        required: true,
    },
    usersLiked:{
        type: Array,
        required: true,
    },
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
    userCreated:{
        type: String,
        ref: "User",
    },
})

module.exports = mongoose.model('Comment', CommentSchema)