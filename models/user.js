const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: emailRegex
  },
  name: {
    type: String
  },
  password: {
    type: String,
    minlength: [5, 'Password must be at least 5 characters long.']
  },
  likedPlaylists: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Playlist',
    default: []
  }
})

UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password)
}

UserSchema.options.toJSON = {
  transform: (doc, ret) => {
    delete ret.password
    return ret
  }
}

UserSchema.pre('save', function(next) {
  if (!this.isModified('password')) return next()
  const hash = bcrypt.hashSync(this.password)
  this.password = hash
  next()
})

const User = mongoose.model('User', UserSchema)

module.exports = User