const mongoose = require("mongoose")

const MessageSchema = new mongoose.Schema({
  author: String,
  content: String,
  project: String,
  date: Date
})

const Message = mongoose.model("Task", MessageSchema)

module.exports = Message
