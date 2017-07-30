const mongoose = require('mongoose')
const Schema = mongoose.Schema

var inputSchema = new Schema({
  pair: Array,
  janUp: Boolean,
  febUp: Boolean,
  marUp: Boolean,
  aprUp: Boolean,
  mayUp: Boolean,
  junUp: Boolean,
  julUp: Boolean,
  augUp: Boolean,
  sepUp: Boolean,
  octUp: Boolean,
  novUp: Boolean,
  decUp: Boolean,
  comment: String
})

const Input = mongoose.model('Input', inputSchema)

module.exports = Input
