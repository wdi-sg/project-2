const mongoose = require('mongoose')
const Schema = mongoose.Schema


const userSchema = new Schema({
  twitterId : {
    type: Number
  },
  token : {
      type : String
  },
  username : {
    type : String
  },
  displayName : {
    type: String
  }
})

const User = mongoose.model('User', userSchema)
module.exports = User
