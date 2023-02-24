const mongoose = require('mongoose')
const connectDB = async()=>{
    try{
        const conn = await mongoose.connect(process.env.DB_STRING,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        })
    }catch(err){
        
    }
}