const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    image:{
        type: String,
        require: true,
    },
    cloudinaryId:{
        type: String,
        require: true,
    },
    caption:{
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
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
})
  
module.exports = mongoose.model("Post", PostSchema)
  