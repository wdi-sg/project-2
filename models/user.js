const mongoose = require("mongoose")
// const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [3, "Name must be between 3 and 99 characters"],
    maxlength: [99, "Name must be between 3 and 99 characters"]
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
    // match: emailRegex
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "Password must be between 6 and 99 characters"],
    maxlength: [99, "Password must be between 6 and 99 characters"]
  },
  slug: String
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
