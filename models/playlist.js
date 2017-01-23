const mongoose = require('mongoose')
const TrackSchema = require('./track').Schema

const PlaylistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  collaborators: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User'
  },
  tracks: [TrackSchema]
})

const Playlist = mongoose.model('Playlist', PlaylistSchema)

module.exports = Playlist