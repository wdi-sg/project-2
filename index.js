require("dotenv").config({
	silent: true
})

const dbUrl = process.env.MONGODB_URI === "production" ? process.env.MONGODB_URI : "mongodb://localhost/project2"
const port = process.env.PORT || 3000

const quoteApiKey = process.env.QUOTEAPI

const express = require("express")
const mongoose = require("mongoose")
const exphbs = require("express-handlebars")
const bodyParser = require("body-parser")
// access POST request
const methodOverride = require("method-override")

const session = require("express-session")
const MongoStore = require("connect-mongo")(session)
const passport = require("./config/ppConfig.js")

// require userSchema
const User = require("./models/user")

// require route files
const register_routes = require("./routes/register_routes")
const login_routes = require("./routes/login_routes")
const profile_routes = require("./routes/profile_routes")

// initiate express
const app = express()
// View engine handlebars setup
app.engine("handlebars", exphbs({ defaultLayout: "main"}))
app.set("view engine", "handlebars")

// setup bodyParser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended: true
}))

// setup methodOverride
app.use(methodOverride("_method"))

// connectin to mongodb
mongoose.Promise = global.Promise

mongoose.connect(dbUrl, {
	useMongoClient: true
})
	.then(
		() => { console.log("db is connected :P") },
		(err) => { console.log(err) }
	)

app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true,
	store: new MongoStore ({ mongooseConnection: mongoose.connection })
}))

app.use(passport.initialize())
app.use(passport.session())

app.get("/", (req, res) => {
	res.render("home")
})

// routes
app.use("/register", register_routes)
app.use("/login", login_routes)
app.use("/profile", profile_routes)

// set port for express to listen to
app.listen(port, () => {
	console.log(`Server is running on ${port}`)
})
