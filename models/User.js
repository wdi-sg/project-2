const mongoose = require('mongoose')
const Schema = mongoose.Schema
// const bcrypt = require('bcrypt')
const findOrCreate = require('mongoose-findorcreate')

const userSchema = new Schema({
  igId: String,
  username: String,
  access_token: String
})

userSchema.plugin(findOrCreate)

const User = mongoose.model('User', userSchema)

module.exports = User
