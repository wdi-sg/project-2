const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  projectId: mongoose.Schema.Types.ObjectId,
  currentUser: mongoose.Schema.Types.ObjectId,
  start: Date,
  end: Date,
  projectedEnd: Date,
  status: { type: String, default: "0" } //create, review, return
})

const Task = mongoose.model("Task", taskSchema)

module.exports = Task
