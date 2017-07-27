const mongoose = require ('mongoose')
const Schema = mongoose.Schema
const findOrCreate = require('mongoose-findorcreate')

const episodeSchema = new Schema ({
  name: String,
  id: String,
  season: String,
  episode: String,
  user: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
})

episodeSchema.plugin(findOrCreate)

const Episode = mongoose.model('Episode', episodeSchema)

module.exports = Episode
