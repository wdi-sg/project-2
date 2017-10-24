const exphbs = require("express-handlebars")
const express = require("express")
const path = require("path")
const bodyParser = require('body-parser')
const session = require("express-session")
const MongoStore = require("connect-mongo")(session)
const passport = require("./config/ppConfig")
const methodOverride = require('method-override')
const cloudinary = require('cloudinary')
const unirest = require("unirest")
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
  next()
})
// ===== Require models ===== //
const User = require("./models/user")
const Thread = require("./models/threads")
const Answer = require("./models/answers")
// ===== Require Routes ====== //
const vote_routes = require("./routes/vote_routes")
const answer_routes = require("./routes/answer_routes")

// ===== ROUTE ACCESS ===== //
app.use("/vote", vote_routes)
app.use("/addAnswer", answer_routes)

app.post("/testing",(req,res)=>{

  unirest.post("https://neutrinoapi-html-to-pdf.p.mashape.com/html-to-pdf")
  .header("X-Mashape-Key", "SPJC93KUGAmshJA6zzRMzYDjXoKRp1j1dRwjsnL0wdwfZyjVKb")
  .header("Content-Type", "application/x-www-form-urlencoded")
  .send("content=https://viscuss.herokuapp.com/")
  .send("html-width=1024")
  .send("margin=10")
  .send("title=My Title")
  .end(function (result) {
    res.send(result.body)
    // console.log(result.status, result.headers, result.body);
  })
})




app.get('/', (req, res) => {
  Thread.find({}, function (err, data) {
    if (err) {
      console.log(err)
      return
    }
    res.render('user/home', {
      title: 'Questions In DB',
      threads: data

    })
  }).sort({totalVotes: -1})
})

app.get("/newquestion",(req,res)=>{
  res.render("user/newquestion",{
    title: "Ask a question!"
  })
})



app.get('/logout',hasLoggedOut, (req, res) => {
  req.logout()
  res.redirect('/')
})

app.get("/profile",hasLoggedOut, (req,res)=>{
  User.findById(req.user.id)
  .then(user=>{
    Thread.find({creator:req.user.id})
    .then(thread=>{
    Answer.find({creator:req.user.id})
    .then(ans=>{
      res.render("user/profile_page",{
        profile: user,
        title: `${req.user.name}'s Profile`,
        answers:ans,
        questions:thread
      })
    })
  })

  })

})

app.get("/landingpage",isLoggedIn,(req,res)=>{
  res.render("user/landingpage",{
    title: "User Login"
  })
})
app.delete("/thread/:id", (req,res)=>{
  Thread.findByIdAndRemove(req.params.id)
  .then(() => res.redirect(`/profile`))
  .catch(err => console.log(err))
})

app.get(`/thread/:id`, (req, res) => {
  Thread.findById({_id: req.params.id})
  .then(thread=>{
    Answer.find({parent: req.params.id})
    .then(result=>{
      if(thread.creator==="anonymous"){

        res.render('user/singlethread', {
          data: thread,
          author: "anonymous",
          answer: result,
          title: thread.question

        })
      }else{
        User.findById({_id: thread.creator})
        .then(creator=>{

          res.render('user/singlethread', {
            data: thread,
            author: creator.name,
            answer: result,
            title: thread.question

          })

        })
      }
    })
  })
})
app.post("/image", (req,res)=>{
  User.findByIdAndUpdate(req.user.id, {pic: req.body.upload})
  .then(user=>{
res.redirect("/profile")
  })

})


app.post('/uploadImage', upload.single('myFile'), function(req, res) {
  cloudinary.uploader.upload(req.file.path, function(result) {
    res.send(result);
  })
})


app.post('/addquestions', function (req, res) {
  var creator = ""
  if(!req.user) creator = "anonymous"
  else if(req.user.id) creator = req.user.id

  let newQues = new Thread({
    question: req.body.question,
    description: req.body.description,
    creator: creator

  })

  newQues.save()
  .then(output => {
    displayResults(output.ops)
  })
  // debug code (output request body)
  res.redirect("/")
})

app.post("/landingpage/register", (req,res)=>{
  var formData = req.body // if this is modified, change the landingpage fields as well as ppConfig
  let newUser = new User({
    name: formData.name,
    email: formData.email,
    password: formData.password
  })

  newUser.save()
  .then(user=>{
    res.redirect(`/profile`)
  })
})

app.post("/landingpage/login", passport.authenticate("local",{
  successRedirect: "/",
  failureRedirect: "/landingPage"
}))


///////// TESTING AREA ///////////


//Run port access
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
