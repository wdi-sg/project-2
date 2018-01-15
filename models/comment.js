const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentsSchema = new Schema({
  comment: String,
  by: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    to: {
      type: Schema.Types.ObjectId,
      ref: 'Listings'
    }
})

const Comments = mongoose.model('Comments', commentsSchema)

module.exports = Comments
