const mongoose = require('mongoose')
const Schema = mongoose.Schema

const showSchema = new Schema({
  name: String,
  description: String,
  showpic: String,
  slug: String
})

const Show = mongoose.model('Show', showSchema)

module.exports = Show
