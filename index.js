const bodyParser = require('body-parser')
const ejsLayouts = require('express-ejs-layouts')
const express = require('express')
const flash = require('connect-flash')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const passport = require('./config/ppConfig')
const path = require('path')
const session = require('express-session')

const app = express()

require('dotenv').config({silent: true})

mongoose.connect('mongodb://localhost/bfit')
mongoose.Promises = global.Promises


app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({extended: false}))
app.use(ejsLayouts)
app.use(methodOverride('_method'))
