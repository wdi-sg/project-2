const mongoose = require('mongoose')
const Schema = mongoose.Schema

const carparkSchema = new Schema({
  name: String,
  address: String
})

const Carpark = mongoose.model('Carpark', carparkSchema)

module.exports = Carpark
