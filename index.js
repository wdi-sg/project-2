require('dotenv').config({ silent: true })

const dbUrl =
process.env.NODE_ENV === 'production' ? process.env.MLAB_URI : 'mongodb://localhost/project-2'
const port = process.env.PORT || 4000

// install all modules
const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const passport = require('./config/ppConfig')

const { hasLoggedOut, isLoggedIn } = require('./helpers')

const User = require('./models/user')
const Book = require('./models/book')

// require routes
const login_routes = require('./routes/login_routes')
const register_routes = require('./routes/register_routes')
const browse_routes = require('./routes/browse_routes')
const profile_routes = require('./routes/profile_routes')

// setup express
const app = express()

// setup handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// setup middleware
app.use(express.static(path.join(__dirname, 'public'))) // static path
app.use(function (req, res, next) {
  console.log('Method: ' + req.method + ' Path: ' + req.url)
  next()
})

// setup bodyParser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

// setup methodOverride
app.use(methodOverride('_method'))

// connecting to mongodb before we start the server
// via mongoose
mongoose.Promise = global.Promise
mongoose.connect(dbUrl, {
  useMongoClient: true
})
.then(
  () => { console.log('database is connected') },
  (err) => { console.log(err) }
)

// OCT 23. activation of session after you connect to mongoose
// MUST BE AFTER YOUR `mongoose.connect`
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}))

// OCT 23. must be below your session configuration
// THIS IS WHERE PASSPORT GOT ACTIVATED
app.use(passport.initialize())
app.use(passport.session())

// No idea what this does?
app.use((req, res, next) => {
  app.locals.user = req.user
  next()
})

// ROUTE to home
app.get('/', (req, res) => {
  res.render('home')
})

// Adding books to DB and user readBooks
app.post('/saveBook', (req, res) => {
  var formData = req.body
// save the book to DB
  var newBook = new Book({
    title: formData.bookTitle,
    author: formData.bookAuthor,
    description: formData.bookDescription
  })
  newBook.save()
})

// Creating 'I have read this' or 'unread this' btn
// pseudo code is...
// 1. on.click more info
// 2. get book specific API
// 3. add book to DB if it doesnt already exist in DB..
// 4. find book _id of current book
// 5. iterate current user's readBooks array
// 6. if book_id matches any of user readBooks array, add 'remove from read list' btn
// 6. else add 'I have read this' btn
app.post('/createBtn', (req, res) => {
  var formData = req.body
  var returnId = ''
  Book.findOne(
    {title: formData.bookTitle}
  )
  .then(book => {
    req.user.readBooks.forEach((bookid) => {
      console.log('book.id', book.id)
      console.log('bookid', bookid)
      if (bookid == book.id) {
        console.log('match!')
        returnId = book.id
        console.log('returnId', returnId)
        res.send({
          message: returnId
        })
      }
    })
  })
  // return returnId
})

app.post('/addReadBook', (req, res) => {
  var formData = req.body
  Book.findOne(
    {title: formData.bookTitle}
  )
  .then(book => {

    // console.log(book)
    // console.log(req.user)
    // req.user.readBooks.forEach((bookId) => {
    //   if(bookId === book.id)
    // })

    req.user.readBooks.push(book._id)
    req.user.save()
    .then((result) => res.send({
      message: result
    }))
    .catch(
      err => console.log(err)
    )
  })
})

// NEW ROUTES - admin registration flow
app.use('/login', isLoggedIn, login_routes)
app.use('/register', register_routes)
app.use('/browse', browse_routes)
app.use('/profile', profile_routes)

// ROUTE for logout
app.get('/logout', hasLoggedOut, (req, res) => {
  req.logout()
  res.redirect('/register')
})

// opening port for express
app.listen(port, () => {
  console.log(`Server is running on ${port}`)
})
