const mongoose = require('mongoose')
//Structure of a "post" document
const PostSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    coudinaryId:{
        type: String,
        required: true
    },
    caption:{
        type: String,
        required: true
    },
    likes:{
        type: Number,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
})
//PostSchema is exported to mongoose model with the name 'Post'
module.export = mongoose.model('Post', PostSchema)