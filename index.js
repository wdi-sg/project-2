const express = require("express")
const mongoose = require("mongoose")
const exphbs = require("express-handlebars")
const bodyParser = require("body-parser")
const app = express()


const dbUrl = process.env.MONGODB_URI === "production" ? process.env.MONGODB_URI : "mongodb://localhost/project2"
const port = process.env.PORT || 3000

// require userSchema
const User = require("./models/user")

// View engine handlebars setup
app.engine("handlebars", exphbs({ defaultLayout: "main"}))
app.set("view engine", "handlebars")


app.get("/", (req, res) => {
	res.render("home")
})

// connectin to mongodb
mongoose.Promise = global.Promise

mongoose.connect(dbUrl, {
	useMongoClient: true
})
	.then(
		() => { console.log("db is connected :P") },
		(err) => { console.log(err) }
	)


// set port for express to listen to
app.listen(port, () => {
	console.log(`Server is running on ${port}`)
})
