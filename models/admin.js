const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const adminSchema = new Schema({
  name: String,
  email: String,
  password: String
})

adminSchema.pre('save', function (next) {
  var admin = this

  bcrypt.hash(admin.password, 10)
  .then(hash => {
    admin.password = hash
    console.log(`admin saved to db is ${admin}`);
    next()
  })
  .catch(err => {
    next(err)
  })
})

adminSchema.methods.validPassword = function (plainPassword, callback) {
  bcrypt.compare(plainPassword, this.password, callback)
}

const Admin = mongoose.model('Admin', adminSchema)

module.exports = Admin
