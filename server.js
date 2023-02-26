const express = require('express')
const app = express()//use variable app as a call to express
const mongoose = require('mongoose')//mongoose library for mongoDB
const passport = require('passport')//passport library for user auth
const session = reqire('express-session')//express session middleware for session managment
const MongoStore = require("connect-mongo")(session)//import the Connect-Mongo middleware for storing session data in MongoDB
const methodOverride = require("method-override")//import the Method-Override middleware for using HTTP verbs like PUT and DELETE
const flash = require("express-flash")//import the Express-Flash middleware for displaying flash messages
const logger = require("morgan")//import the Morgan middleware for logging HTTP requests and responses
const connectDB = require("./config/database")//import the database configuration function
const mainRoutes = require("./routes/main")//import the main routes module
const postRoutes = require("./routes/posts")//import the post routes module

//Load environment variables from a .env file located in the config folder
require("dotenv").config({ path: "./config/.env" })

//Load passport configuration
require("./config/passport")(passport)

//Connect to the database
connectDB()

//Set the view engine to EJS
app.set("view engine", "ejs")

//Serve static files from the public folder
app.use(express.static("public"))

//Parse incoming request bodies as URL-encoded or JSON
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//Log requests to the console
app.use(logger("dev"))

//Override HTTP methods for PUT and DELETE requests
app.use(methodOverride("_method"))

//Setup sessions for tracking user state, with session data stored in MongoDB
app.use(session({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
)

//Setup passport middleware for authentication
app.use(passport.initialize())
app.use(passport.session())

//Use flash messages for displaying feedback to the user
app.use(flash())

//Set up routes for the server to listen for
app.use("/", mainRoutes)
app.use("/post", postRoutes)

//Start the server and listen for incoming requests on port 2121
app.listen(2121, () => {
console.log("Server is running, you better catch it!")
})