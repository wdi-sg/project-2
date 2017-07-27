const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please type your name']
  },
  email: {
    type: String,
    required: [true, 'Please type your email']
  },
  password: String,
  portfolio: [{
    type: Schema.Types.ObjectId,
    ref: 'Portfolio'
  }]
})

//userSchema.pre('save', function (next) {
  // var user = this // this keyword ==> the newUser obj instance

  //  // Only hash the password if it has been modified (or is new)
  // if (!user.isModified('password')) return next()

  //  // hash the password ASYNCHRONOUSLY
  // bcrypt.hash(user.password, 10, function (err, hash) {
  //   if (err) return next(err)

  //   // Override the cleartext password with the hashed one
  //   user.password = hash
  //   next() // call the save fn
  // })
//})

userSchema.methods.validPassword = function (givenPassword) {
  // t/f based on the user.hashed compared with form.password
  // if (givenPassword === this.password) {return true}
  // return false
  // console.log('given ', givenPassword)
  // console.log('this password ', this.password)
  return bcrypt.compareSync(givenPassword, this.password)
}

userSchema.statics.encrypt = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

const User = mongoose.model('User', userSchema)

module.exports = User
