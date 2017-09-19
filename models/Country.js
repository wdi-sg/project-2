const mongoose = require('mongoose')
const Schema = mongoose.Schema

var countrySchema = new Schema({
  name: String,
  ISOcode: String,
  zoom: String
})

const Country = mongoose.model('Country', countrySchema)

module.exports = Country
