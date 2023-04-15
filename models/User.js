//import bcrypt lib (for hashing password)
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

//create new mongoose schema, contains the fields that will be in the user model
const UserSchema = new mongoose.Schema({
    userName:{
        type: String,
        unique: true 
    },
    email:{
        type: String,
        unique: true
    },
    friendList:{
        type: Array,
        required: true
    },
    profilePic:{
        type: String,
        require: false
    },
    cloudinaryId:{
        type: String,
        required: false
    },
    password: String,
})

//defines a function that will be executed before saving the user to database (middleware)
UserSchema.pre('save', function save(next){
    const user = this
    if(!user.isModified('password')){
        return next()
    }
    bcrypt.genSalt(10, (err, salt)=>{
        if(err){
            return next(err)
        }
        bcrypt.hash(user.password, salt, (err, hash)=>{
            if(err){
                return next(err)
            }
            user.password = hash
            next()
        })
    })
})

UserSchema.methods.comparePassword = function comparePassword(candidatePassword, cb){
    bcrypt.compare(candidatePassword, this.password, (err, isMatch)=>{
        cb(err, isMatch)
    })
}

module.exports = mongoose.model('User', UserSchema)