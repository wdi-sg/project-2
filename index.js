const express = require("express")
const app = express()
const exphbs = require("express-handlebars")
const bodyParser = require("body-parser")
const path = require("path")
const User = require("./models/user")

const port = 3000

// initialize mongoose and mongodb
const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/project-2", {
  useMongoClient: true
})
mongoose.Promise = global.Promise

//middlewares
app.engine("handlebars", exphbs({ defaultLayout: "main" }))
app.set("view engine", "handlebars")

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

//express path for views
app.use(express.static(path.join(__dirname, "views")))

app.get("/", (req, res) => {
  res.render("index")
})

app.get("/login", (req, res) => {
  res.render("login")
})

app.post("/login", (req, res) => {
  let newUser = new User(req.body)
  newUser.save()
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
