const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taskSchema = new Schema({
  fridge:{
    type: Schema.Types.ObjectId,
    ref: 'Fridge'
  },
  details: String,
  assign: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  complete:{
    type: Boolean
  }
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task
