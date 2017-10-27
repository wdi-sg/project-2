const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const partnerSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: [8, 'Password must be between 8 and 99 characters'],
    maxlength: [99, 'Password must be between 8 and 99 characters']
  },
  name: {
    type: String,
    required: true
  },
  mobile: {
    type: Number,
    required: true
  },
  slug: String,
  startPostal: String,
  endPostal: String,
  arrTime: Number,
  ride: String
})

partnerSchema.pre('save', function (next) {
  var partner = this
  partner.slug = partner.name.toLowerCase().split(' ').join('-')

  bcrypt.hash(partner.password, 10)
  .then(hash => {
    partner.password = hash
    console.log('pre save flow', partner)
    next()
  })
})

partnerSchema.methods.validPassword = function (plainPassword, callback) {
  bcrypt.compare(plainPassword, this.password, callback)
}
const Partner = mongoose.model('Partner', partnerSchema)

module.exports = Partner
