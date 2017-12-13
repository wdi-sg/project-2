require("dotenv").config({ silent: true })

const dbUrl =
  process.env.NODE_ENV === "production"
    ? process.env.MLAB_URI
    : "mongodb://localhost/project-2"
const port = process.env.PORT || 4000

// install all modules
const express = require("express")
const path = require("path")
const mongoose = require("mongoose")
const exphbs = require("express-handlebars")
const bodyParser = require("body-parser")
const methodOverride = require("method-override")
const session = require("express-session")
const MongoStore = require("connect-mongo")(session)
const passport = require("./config/ppConfig")

const { hasLoggedOut, isLoggedIn } = require("./helpers")

// require models
const User = require("./models/user")
const Book = require("./models/book")
const Comment = require("./models/comment")

// require routes
const login_routes = require("./routes/login_routes")
const register_routes = require("./routes/register_routes")
const browse_routes = require("./routes/browse_routes")
const profile_routes = require("./routes/profile_routes")
const booksRead_routes = require("./routes/booksRead_routes")

// setup express
const app = express()

// setup handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }))
app.set("view engine", "handlebars")

// setup middleware
app.use(express.static(path.join(__dirname, "public"))) // static path
app.use(function(req, res, next) {
  console.log("Method: " + req.method + " Path: " + req.url)
  next()
})

// setup bodyParser
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

// setup methodOverride
app.use(methodOverride("_method"))

// connecting to mongodb before we start the server
// via mongoose
mongoose.Promise = global.Promise
mongoose
  .connect(dbUrl, {
    useMongoClient: true
  })
  .then(
    () => {
      console.log("database is connected")
    },
    err => {
      console.log(err)
    }
  )

// OCT 23. activation of session after you connect to mongoose
// MUST BE AFTER YOUR `mongoose.connect`
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
)

// OCT 23. must be below your session configuration
// THIS IS WHERE PASSPORT GOT ACTIVATED
app.use(passport.initialize())
app.use(passport.session())

// middleware to pass user as global var
app.use((req, res, next) => {
  app.locals.user = req.user
  next()
})

// ROUTE to home
app.get("/", (req, res) => {
  res.render("home")
})

// Adding books to DB
app.post("/saveBook", (req, res) => {
  var formData = req.body
  // check if book is already in DB
  Book.findOne({ apiId: formData.apiId }).then(book => {
    if (book) return res.json(book)
    if (!book) {
      var newBook = new Book({
        apiId: formData.apiId,
        title: formData.bookTitle,
        author: formData.bookAuthor,
        img: formData.img,
        thumbnail: formData.thumbnail,
        publisher: formData.publisher,
        publishedDate: formData.publishedDate,
        description: formData.bookDescription
      })
      newBook.save().then(book => res.json(book))
    }
  })
})

// book details router
// /book/:id (get)
// /book/:id (post) - for saving to DB
// /book/:id (put) - update
// /book/:id (delete) - update

// Add to read books
app.post("/addReadBook", (req, res) => {
  var formData = req.body
  Book.findOne({ _id: formData.bookId }).then(book => {
    req.user.readBooks.push(book._id)
    req.user.save()
  })
})

// Remove read book
app.post("/removeReadBook", (req, res) => {
  var formData = req.body
  for (var i = req.user.readBooks.length - 1; i >= 0; i--) {
    if (req.user.readBooks[i] == formData.bookId) {
      req.user.readBooks.splice(i, 1)
      req.user.save()
    }
  }
})

// Add comment
app.post("/addComment", (req, res) => {
  var formData = req.body
  // console.log(formData)
  // console.log(req.user)
  var newComment = new Comment({
    book_id: formData.bookId,
    author: req.user._id,
    comment: formData.comment
  })
  newComment.save().then(comment => res.json(comment))
})

// NEW ROUTES - admin registration flow
app.use("/login", isLoggedIn, login_routes)
app.use("/register", isLoggedIn, register_routes)
app.use("/browse", hasLoggedOut, browse_routes)
app.use("/profile", hasLoggedOut, profile_routes)
app.use("/booksRead", hasLoggedOut, booksRead_routes)

// ROUTE for logout
app.get("/logout", hasLoggedOut, (req, res) => {
  req.logout()
  res.redirect("/")
})

// opening port for express
app.listen(port, () => {
  console.log(`Server is running on ${port}`)
})
