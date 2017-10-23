const mongoose = require('mongoose')
const Schema = mongoose.Schema

const locationSchema = new Schema({
  name: String,
  country: String,
  type: String,
  title: String,
  description: String,
  location_id: String,
  imageUrl: String,
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})


const Location = mongoose.model('Location', locationSchema)


module.exports = Location
