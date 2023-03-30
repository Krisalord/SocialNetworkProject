const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    userOne:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    userOneName:{
        type: String,
        ref: 'User',
    },
    userTwo:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    userTwoName:{
        type: String,
        ref: 'User',
    },
})

module.exports = mongoose.model('Chat', chatSchema);