// requiring mongoose again
const mongoose = require('mongoose')
const Schema = mongoose.Schema // constructor for all schema

// UPDATE 20 Oct
// requiring bcrypt
const bcrypt = require('bcrypt') // for login and register

// setting the blueprint of User object
const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  slug: String
})

userSchema.pre('save', function (next) {
  var user = this
  user.slug = user.name.toLowerCase().split(' ').join('-')

  bcrypt.hash(user.password, 10)
  .then(hash => {
    user.password = hash
    console.log('pre save flow', user)
    next()
  })
})

userSchema.methods.validPassword = function (plainPassword, callback) {
  bcrypt.compare(plainPassword, this.password, callback)
}

// active the blueprint
// registering the name of the database that we're connecting to
const User = mongoose.model('User', userSchema)
// look for users collection in mDb
// we can name the object differently as to the DB registry

// need to export this
module.exports = User
