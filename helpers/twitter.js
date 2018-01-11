const Twit = require('twit')
require('dotenv').config()

var tweet = new Twit({
  consumer_key : process.env.LOCAL_CONSUMER_KEY,
  consumer_secret : process.env.LOCAL_CONSUMER_SECRET,
  access_token : process.env.LOCAL_ACCESS_TOKEN,
  access_token_secret : process.env.LOCAL_ACCESS_TOKEN_SECRET,
  timeout_ms : 60 * 1000
})

module.exports = tweet
