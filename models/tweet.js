const User = require('../models/user')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userId = { type: Schema.Types.ObjectId, ref: 'User' }
const requiredString = { type: String, required: true }

const tweetSchema = new Schema({
  message: requiredString,
  author: userId,
  parentTweet: this,
  childrenTweets: [ this ],
  favourites: [userId],
  retweets: [userId]
})

const Tweet = mongoose.model('Tweet', tweetSchema)

module.exports = Tweet
