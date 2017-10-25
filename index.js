const exphbs = require("express-handlebars")
const express = require("express")
const path = require("path")
const bodyParser = require('body-parser')
const session = require("express-session")
const MongoStore = require("connect-mongo")(session)
const passport = require("./config/ppConfig")
const methodOverride = require('method-override')
const cloudinary = require('cloudinary')
const flash = require("connect-flash")

const { hasLoggedOut, isLoggedIn } = require('./helpers')


const dbUrl =
process.env.NODE_ENV === 'production' ? process.env.MONGODB_URI : 'mongodb://localhost/proj2local'
const port = process.env.PORT || 3500
const app = express()
require("dotenv").config({silent: true})

// ======= Set up multer ==========
const multer = require('multer');
const upload = multer({ dest: './uploads/' });
//======= initialize mongoose connection
const mongoose = require('mongoose')
mongoose.connect(dbUrl , {
  useMongoClient: true
})
mongoose.Promise = global.Promise //allows us to use .then
// ======== Setting up Sessions AFTER connecting to mongoose ===== //
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true, //saves session and stores it in DB
  store: new MongoStore({ mongooseConnection: mongoose.connection }) // store it in MongoDB, this requires mongo-connect to work
}))
// ====== set up flash ======
app.use(flash())
cloudinary.config({
  cloud_name: 'josephpung',
  api_key: '224536719142566',
  api_secret: 'yu7dYqNAHQOOhagpU3Ykq57w-_A'
})
// setup methodOverride
app.use(methodOverride('_method'))
//=== Setup passport
app.use(passport.initialize())
app.use(passport.session())
// ===== Set up bodyparser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
//======= Set up handlebars
app.engine('handlebars', exphbs({defaultLayout:'main'}))
app.set('view engine', 'handlebars')
// ====== Set up path
app.use(express.static(path.join(__dirname, 'public')))
//======== set Local user variable
app.use((req,res,next)=>{
  app.locals.currentUser = req.user ? req.user : null
  app.locals.alerts = req.flash()
  next()
})
// ===== Require models ===== //
const User = require("./models/user")
const Thread = require("./models/threads")
const Answer = require("./models/answers")
// ===== Require Routes ====== //
const vote_routes = require("./routes/vote_routes")
const answer_routes = require("./routes/answer_routes")
const default_routes = require("./routes/default_routes")
const landing_page = require("./routes/landing_page")
const thread_routes = require("./routes/thread_routes")
const admin_routes = require("./routes/admin_routes")

// ===== ROUTE ACCESS ===== //
app.use("/vote", vote_routes)
app.use("/addAnswer", answer_routes)
app.use("/", default_routes)
app.use("/thread", thread_routes)
app.use("/landingPage", landing_page)
app.use("/admin", admin_routes)





app.post('/uploadImage', upload.single('myFile'), function(req, res) {
  cloudinary.uploader.upload(req.file.path, function(result) {
    res.send(result);
  })
})


// app.post('/addquestions', function (req, res) {
//   var creator = ""
//   if(!req.user) creator = "anonymous"
//   else if(req.user.id) creator = req.user.id
//
//   let newQues = new Thread({
//     question: req.body.question,
//     description: req.body.description,
//     creator: creator
//
//   })
//
//   newQues.save()
//   .then(output => {
//     displayResults(output.ops)
//   })
//   // debug code (output request body)
//   res.redirect("/")
// })

// app.post("/landingpage/register", (req,res)=>{
//   var formData = req.body // if this is modified, change the landingpage fields as well as ppConfig
//   let newUser = new User({
//     name: formData.name,
//     email: formData.email,
//     password: formData.password
//   })
//
//   newUser.save()
//   .then(user=>{
//     res.redirect(`/profile`)
//   })
// })

///////// TESTING AREA ///////////


//Run port access
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
