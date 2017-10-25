const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  project: String,
  currentUser: String,
  start: { type: Date, default: Date.now },
  end: Date,
  projectedEnd: Date,
  status: { type: String, default: "0" } //create, review, return
})

const Task = mongoose.model("Task", taskSchema)

module.exports = Task
