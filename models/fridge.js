const mongoose = require('mongoose')
const Schema = mongoose.Schema // constructor for all Schema

const fridgeSchema = new Schema({
  name: String,
  passcode:String,
  members: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

const Fridge = mongoose.model('Fridge', fridgeSchema)

module.exports = Fridge
