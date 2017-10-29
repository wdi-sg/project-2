const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  projectId: mongoose.Schema.Types.ObjectId,
  assigned: String,
  start: Date,
  end: Date,
  projectedEnd: Date,
  status: { type: String, default: "0" } //create, review, return
})

taskSchema.methods.isCreate = function(status) {
  return this.status === "0"
}

taskSchema.methods.isReview = function(status) {
  return this.status === "1"
}

taskSchema.methods.isReturn = function(status) {
  return this.status === "2"
}

const Task = mongoose.model("Task", taskSchema)

module.exports = Task
