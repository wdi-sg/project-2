const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const expressValidator = require('express-validator')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const path = require('path')
const server = require('http').createServer(app)

const io = require('socket.io')(server)
const flash =require('connect-flash')
const passport = require('passport')
const port = process.env.PORT || 3000;

const routes = require('./routes/routes')
const dbConfig = require('./helpers/dbConfig')
const Twit = require('twit')
const tweet = require('./helpers/twitter')
const moment = require('moment-timezone')
const nsLineStations = require('./helpers/nsLineStations')
const nsLine = require('./helpers/nsLine')
const ewLineStations = require('./helpers/ewLineStations')
const ewLine = require('./helpers/ewLine')
const circleLineStations = require('./helpers/circleLineStations')
const circleLine = require('./helpers/circleLine')
const neLineStations = require('./helpers/neLineStations')
const neLine = require('./helpers/neLine')
const dtLineStations = require('./helpers/dtLineStations')
const dtLine = require('./helpers/dtLine')
require('dotenv').config()

mongoose.Promise = global.Promise
mongoose.connect(dbConfig.urllive, {useMongoClient : true})
.then(()=>{console.log('Mongoose connected')}, (err)=>{console.log(err)})

//read cookies
app.use(cookieParser());
// get info from html forms
app.use(bodyParser.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ url: dbConfig.urllive })
}))

// Passport

app.use(passport.initialize())
app.use(passport.session())

// Flash messages for express

app.use(flash())
app.use((req, res, next) => {
  res.locals.alerts = req.flash()
  res.locals.currentUser = req.user
  next()
})

// Express validator

app.use(expressValidator({
  errorFormatter : (param, msg, value) => {
    let namespace = param.split('.'),
    root = namespace.shift(),
    formParam = root

    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']'
    }

    return {
      param : formParam,
      msg : msg,
      value : value
    }
  }
}))

app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static(path.join(__dirname, 'public')))
app.engine('handlebars', exphbs({defaultLayout: 'main'}))

app.set('view engine', 'handlebars')

// Routes
app.use('/', routes)

// Twitter in Sockets
let newTweets = []
let ewTweets = []
let nsTweets = []
let neTweets = []
let dtTweets = []
let circleTweets = []
let fromDate

// Date conversion
function getLocalDate(date){
  let splitDate = (date).split(' ')
  let newDate = splitDate[0] + ', ' + splitDate[2] + ' ' + splitDate[1] + ' ' + splitDate[5] + ' ' + splitDate[3] + ' ' + splitDate[4]

  let convertedDate = moment.tz(newDate, 'Asia/Singapore').format()
  fromDate = moment(convertedDate).fromNow();
}

// End of Date Conversion

// Start of Twitter in Sockets
io.on('connection', function (socket) {
  console.log('--- Socket Connection Active ---')

  let query = 'Smrt OR SMRT OR smrt train OR track delay OR fault OR disruption OR , -press, -parody, -from:stompsingapore, -from:ChannelNewsAsia'

  tweet.get('search/tweets', {q: query, count: 50, tweet_mode: 'extended',result_type: 'reverse'}, function (err, data, res) {
    if (err)(console.log(err))
    for (let i = 0; i < data.statuses.length; i++) {
        // Setting desired results to <1 day old & rejecting retweets to avoid clutter
      getLocalDate(data.statuses[i].created_at)
      if (!data.statuses[i].retweeted_status && !fromDate.includes('day')) {
        // console.log(data.statuses[i])
        let textCheck = data.statuses[i].full_text
        // console.log(textCheck)
        let ewChecker = [], ewSChecker = []
        let nsChecker = [], nsSChecker = []
        let neChecker = [], neSChecker = []
        let dtChecker = [], dtSChecker = []
        let circleChecker = [], circleSChecker = []

        // Look into ForEach implementation for Line Checker
        function newLineCheck () {
          // For EW Line Check
          for (let a = 0; a < ewLineStations.length; a++) {
            ewChecker.push(textCheck.includes(ewLineStations[a]))
          }
          for (let a = 0; a < ewLine.length; a++) {
            ewSChecker.push(textCheck.includes(ewLine[a]))
          }
          // For NS Line Check
          for (let a = 0; a < nsLineStations.length; a++) {
            nsChecker.push(textCheck.includes(nsLineStations[a]))
          }
          for (let a = 0; a < nsLine.length; a++) {
            nsSChecker.push(textCheck.includes(nsLine[a]))
          }
          // For NE Line Check
          for (let a = 0; a < neLineStations.length; a++) {
            neChecker.push(textCheck.includes(neLineStations[a]))
          }
          for (let a = 0; a < neLine.length; a++) {
            neSChecker.push(textCheck.includes(neLine[a]))
          }
          // For DT Line Check
          for (let a = 0; a < dtLineStations.length; a++) {
            dtChecker.push(textCheck.includes(dtLineStations[a]))
          }
          for (let a = 0; a < dtLine.length; a++) {
            dtSChecker.push(textCheck.includes(dtLine[a]))
          }
          // For CC Line Check
          for (let a = 0; a < circleLineStations.length; a++) {
            circleChecker.push(textCheck.includes(circleLineStations[a]))
          }
          for (let a = 0; a < circleLine.length; a++) {
            circleSChecker.push(textCheck.includes(circleLine[a]))
          }
        }

        newLineCheck()

        // console.log(fromDate.includes('day'))

        let newTweet = {
          tweetUser: '@' + data.statuses[i].user.screen_name,
          tweetContent: data.statuses[i].full_text,
          tweetId: data.statuses[i].id,
          tweetDate: fromDate
        }

        if (ewChecker.indexOf(true) >= 0 && nsSChecker.indexOf(true) < 0 &&circleSChecker.indexOf(true) < 0 && neSChecker.indexOf(true) < 0 &&dtSChecker.indexOf(true) < 0) {
          ewTweets.push(newTweet)
          socket.ewtweet = ewTweets
          socket.emit('loadewtweets', {tweet: socket.ewtweet})
          ewTweets = []
        }
        if (nsChecker.indexOf(true) >= 0 && ewSChecker.indexOf(true) < 0 &&circleSChecker.indexOf(true) < 0 && neSChecker.indexOf(true) < 0 &&dtSChecker.indexOf(true) < 0) {
          nsTweets.push(newTweet)
          socket.nstweet = nsTweets
          socket.emit('loadnstweets', {tweet: socket.nstweet})
          nsTweets = []
        }
        if (neChecker.indexOf(true) >= 0 && nsSChecker.indexOf(true) < 0 &&circleSChecker.indexOf(true) < 0 && ewSChecker.indexOf(true) < 0 &&dtSChecker.indexOf(true) < 0) {
          neTweets.push(newTweet)
          socket.netweet = neTweets
          socket.emit('loadnetweets', {tweet: socket.netweet})
          neTweets = []
        }
        if (dtChecker.indexOf(true) >= 0 && nsSChecker.indexOf(true) < 0 &&circleSChecker.indexOf(true) < 0 && neSChecker.indexOf(true) < 0 &&ewSChecker.indexOf(true) < 0) {
          dtTweets.push(newTweet)
          socket.dttweet = dtTweets
          socket.emit('loaddttweets', {tweet: socket.dttweet})
          dtTweets = []
        }
        if (circleChecker.indexOf(true) >= 0 && nsSChecker.indexOf(true) < 0 &&ewSChecker.indexOf(true) < 0 && neSChecker.indexOf(true) < 0 &&dtSChecker.indexOf(true) < 0) {
          circleTweets.push(newTweet)
          socket.circletweet = circleTweets
          socket.emit('loadcircletweets', {tweet: socket.circletweet})
          circleTweets = []
        }
        if (ewChecker.indexOf(true) < 0 && nsChecker.indexOf(true) < 0 &&neChecker.indexOf(true) < 0 && dtChecker.indexOf(true) < 0 &&circleChecker.indexOf(true) < 0) {
          newTweets.push(newTweet)
          socket.tweet = newTweets
          socket.emit('loadtweets', {tweet: socket.tweet})
          newTweets = []
        }
      }
    }
  })

  // End of Twitter Functions

  socket.on('disconnect', function(data){
    console.log('--- Socket Connection Dropped ---');
  });

})

// End of Socket

server.listen(port, () => {
  console.log('---Server Connection Success---')
})
