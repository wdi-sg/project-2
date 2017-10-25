const mongoose = require('mongoose')
const Schema = mongoose.Schema

const showSchema = new Schema({
  name: String
})

const Show = mongoose.model('Show', showSchema)

module.exports = Show
