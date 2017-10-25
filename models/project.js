const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  start: Date,
  end: Date,
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
})

const Project = mongoose.model("Project", projectSchema)

module.exports = Project
