const mongoose = require("mongoose")

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  startDate: Date,
  endDate: Date,
  lead: String,
  members: [],
  tasks: [],
  slug: String
})

projectSchema.pre("save", function(next) {
  let project = this

  project.slug = project.name
    .toLowerCase()
    .split(" ")
    .join("-")
  next()
})

const Project = mongoose.model("Project", projectSchema)

module.exports = Project
