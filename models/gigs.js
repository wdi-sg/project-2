const mongoose = require('mongoose')
const Schema = mongoose.Schema

const gigSchema = new Schema({
  name: String,
  dates: Date,
  specs: String,
  wage: String,
  description: String,
  skills: Array
//  author:
})

const Gig = mongoose.model('Gig', gigSchema)

module.exports = Gig
