const express = require('express')
const app = express()
const MongoClient = require('mongoDB').MongoClient
//Use .env file in config folder
require('dotenv').config({path: './config/.evn'})

//Variable for js file with main routes (URL routes)
const mainRoutes = require('./routes/main')

app.use('/', mainRoutes)