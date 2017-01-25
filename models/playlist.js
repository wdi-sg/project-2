const mongoose = require('mongoose')
const TrackSchema = require('./track').Schema
const CommentSchema = require('./comment').Schema

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
  tracks: [TrackSchema],
  comments: [CommentSchema]
})

const Playlist = mongoose.model('Playlist', PlaylistSchema)

module.exports = Playlist