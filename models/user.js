const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [3, "Name must be between 3 and 99 characters"],
    maxlength: [99, "Name must be between 3 and 99 characters"]
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: [3, "Password must be between 3 and 99 characters"],
    maxlength: [99, "Password must be between 3 and 99 characters"]
  },
  slug: String,
  project: { type: String, default: "" },
  projectId: mongoose.Schema.Types.ObjectId,
  task: [],
  status: { type: String, default: 0 } //0 for on schedule, 1 for late, 2 for not around
})

userSchema.pre("save", function(next) {
  let user = this

  user.slug = user.name
    .toLowerCase()
    .split(" ")
    .join("-")

  bcrypt.hash(user.password, 10).then(hash => {
    user.password = hash
    console.log("pre save flow", user)
    next()
  })
})

userSchema.methods.validPassword = function(plainPassword, callback) {
  return bcrypt.compare(plainPassword, this.password, callback)
}

const User = mongoose.model("User", userSchema)

module.exports = User
