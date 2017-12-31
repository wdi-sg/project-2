const mongoose = require("mongoose")

const MessageSchema = new mongoose.Schema({
  author: String,
  content: String,
  projectId: mongoose.Schema.Types.ObjectId,
  date: Date
})

const Message = mongoose.model("Message", MessageSchema)

module.exports = Message
