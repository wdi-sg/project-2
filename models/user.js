const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')


const userSchema = new Schema({
  name : String,
  email : String,
  password : String,
  slug : String,
  //preferences : [],
  //level : String,
  bookmark : [{ type : Schema.Types.ObjectId, ref : 'Pattern' }],
  project : [{ type : Schema.Types.ObjectId, ref: 'Project' }],
  pattern : [{ type : Schema.Types.ObjectId, ref: 'Pattern' }],
  imageUrl: String,

})

userSchema.pre('save', function(next) {
  var user = this
  user.slug = user.name.toLowerCase().split(' ').join('-')

  bcrypt.hash(user.password, 10)
  .then(hash => {
    user.password = hash
    next()
  })
})

userSchema.methods.validPassword = function (plainPassword, callback) {
  bcrypt.compare(plainPassword, this.password, callback)
}

const User = mongoose.model('User', userSchema)

module.exports = User
