const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bcrypt = require('bcrypt')

const adminSchema = new Schema({
  name: String,
  email: String,
  password: String,
  slug: String,
  type: String
})

adminSchema.pre('save', function (next) {
  var admin = this
  admin.slug = admin.name.toLowerCase().split(' ').join('-')

  bcrypt.hash(admin.password, 10)
  .then(hash => {
    admin.password = hash
    console.log('pre save flow', admin)
    next()
  })
})

adminSchema.methods.validPassword = function (plainPassword, callback) {
  bcrypt.compare(plainPassword, this.password, callback)
}

const Admin = mongoose.model('Admin', adminSchema)

module.exports = Admin
