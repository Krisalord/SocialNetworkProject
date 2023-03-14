//importing Mongoose lib
const mongoose = require('mongoose')
//async function for DB connection
const connectDB = async ()=>{
    try{
        //connection string, uses mongoose connect method, connection string is read from DB_STRING variable (enviromental)
        const connect = await mongoose.connect(process.evn.DB_STRING,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        })
        console.log(`MongoDB connected: ${connect.connection.host}`)
    }catch(err){
        //if error - log it and exit with code 1
        console.error(err)
        process.exit(1)
    }
}
//export connectDB string to be used later
module.export = connectDB;