const express = require('express')
const app = express()
const MongoClient = require('mongoDB').MongoClient
//Use .env file in config folder
require('dotenv').config({path: './config/.evn'})

//Variable for js file with main routes (URL routes)
const mainRoutes = require('./routes/main')

//Using EJS for views
app.set("view engine", "ejs");

app.use('/', mainRoutes)



//Server Running
const PORT = 2121
app.listen(PORT || process.env.PORT, () => {
    console.log("Server is running, you better catch it!");
});
  