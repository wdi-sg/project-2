const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const session = require('express-session')
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
const dbConfig = require('./config/dbConfig')
const Twit = require('twit')
const tweet = require('./helpers/twitter')
const moment = require('moment-timezone')
const nsLineStations = require('./helpers/nsLineStations')
const ewLineStations = require('./helpers/ewLineStations')
const circleLineStations = require('./helpers/circleLineStations')
const neLineStations = require('./helpers/neLineStations')
const dtLineStations = require('./helpers/dtLineStations')
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
}))

// Passport

app.use(passport.initialize());
app.use(passport.session());

// Flash messages for express

app.use(flash());
app.use((req, res, next) => {
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});

// Express validator

app.use(expressValidator({
  errorFormatter : (param, msg, value) => {
      let namespace = param.split('.'),
      root = namespace.shift(),
      formParam = root

        while(namespace.length){
          formParam += '['+ namespace.shift()+ ']'
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
let fromDate;

// Date conversion
function getLocalDate(date){
  let splitDate = (date).split(' ')
  let newDate = splitDate[0] + ', ' + splitDate[2] + ' ' + splitDate[1] + ' ' + splitDate[5] + ' ' + splitDate[3] + ' ' + splitDate[4]

  let convertedDate = moment.tz(newDate, 'Asia/Singapore').format()
  fromDate = moment(convertedDate).fromNow();
}

// End of Date Conversion

io.on('connection', function(socket){
  console.log('Socket Connection Active')

  let query = 'Smrt OR SMRT OR smrt train delay OR fault OR disruption, -press, -parody, '

    tweet.get('search/tweets', {q: query, count: 50, tweet_mode:'extended', result_type:'recent'}, function(err, data, res){
      if(err)(console.log(err))
      for(let i=0; i<data.statuses.length; i++){
        if(data.statuses[i].retweeted_status){
        // console.log("Ignoring Retweets")
        }
        else {

          getLocalDate(data.statuses[i].created_at)
          // console.log(data.statuses[i])
          let textCheck = data.statuses[i].full_text
          // console.log(textCheck)
          let ewChecker = [];
          let nsChecker = [];
          let neChecker = [];
          let dtChecker = [];
          let circleChecker = [];

          function lineCheck(station, checker){
            for (let a=0; a < station.length; a++){
              checker.push(textCheck.includes(station[a]))
            }
          }
          // lineCheck(ewLineStations)
          // console.log(checker)

          let newTweet = {
            tweetUser: '@' + data.statuses[i].user.screen_name,
            tweetContent: data.statuses[i].full_text,
            tweetId: data.statuses[i].id,
            tweetDate: fromDate
          }
          lineCheck(ewLineStations, ewChecker)
          lineCheck(nsLineStations, nsChecker)
          lineCheck(neLineStations, neChecker)
          lineCheck(dtLineStations, dtChecker)
          lineCheck(circleLineStations, circleChecker)
          // console.log(lineCheck(ewLineStations, ewChecker))
          //
          // console.log(dtChecker.indexOf(true))
          if(ewChecker.indexOf(true)>=0){
            // console.log('ew')
            ewTweets.push(newTweet)
            if(ewTweets != [])
            {socket.ewtweet = ewTweets;
            socket.emit('loadewtweets', {tweet: socket.ewtweet})
            ewTweets = [];}
            else {
              socket.emit('loadewok')
            }
          }
          else if(nsChecker.indexOf(true)>=0){
            // console.log('ns')
            nsTweets.push(newTweet)
            if(nsTweets != [])
            {socket.nstweet = nsTweets;
            socket.emit('loadnstweets', {tweet: socket.nstweet})
            nsTweets = [];}
            else {
              socket.emit('loadnsok')
            }
          }
          else if(neChecker.indexOf(true)>=0){
            // console.log('ne')
            neTweets.push(newTweet)
            if(neTweets != [])
            {socket.netweet = neTweets;
            socket.emit('loadnetweets', {tweet: socket.netweet})
            neTweets = [];}
            else {
              socket.emit('loadneok')
            }
          }
          else if(dtChecker.indexOf(true)>=0){
            // console.log('dt')
            dtTweets.push(newTweet)
            if(dtTweets != [])
            {socket.dttweet = dtTweets;
            socket.emit('loaddttweets', {tweet: socket.dttweet})
            dtTweets = [];}
            else {
              socket.emit('loaddtok')
            }
          }
          else if(circleChecker.indexOf(true)>=0){
            // console.log('circle')
            circleTweets.push(newTweet)
            if(circleTweets != [])
            {socket.circletweet = circleTweets;
            socket.emit('loadcircletweets', {tweet: socket.circletweet})
            circleTweets = [];}
            else {
              socket.emit('loadcircleok')
            }
          }
          else{
            newTweets.push(newTweet)
            socket.tweet = newTweets;
            socket.emit('loadtweets', {tweet: socket.tweet})
            newTweets = [];
          }
          //
        }
      }
    })

  // End of Twitter Functions

  socket.on('disconnect', function(data){
    console.log('Socket Connection Dropped');
  });

})

// End of Socket

server.listen(port, () => {
  console.log('---Server Connection Success---')
})
