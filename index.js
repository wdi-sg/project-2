const express = require('express')
const app =express()
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const dbUrl = process.env.NODE_ENV === 'production' ? process.env.MONGODB_URI : 'mongodb://localhost/test'
const port = process.env.NODE_ENV === 'production' ? process.env.PORT : 4000 // this is for our express server
