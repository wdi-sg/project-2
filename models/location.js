const mongoose = require('mongoose')

const locationSchema = new mongoose.Schema({
  districts: {
    type: String
  }
})

const Location = mongoose.model('Location', locationSchema)

module.exports = Location
