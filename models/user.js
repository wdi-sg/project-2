const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [3, "Name must be between 3 and 99 characters"],
    maxlength: [99, "Name must be between 3 and 99 characters"]
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: emailRegex
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "Password must be between 6 and 99 characters"],
    maxlength: [99, "Password must be between 6 and 99 characters"]
  }
})

// UserSchema.pre("save", function(next) {
//   let user = this
//   if (!user.isModified("password")) return next()
//   let hash = bcrypt.hashSync(user.password, 10)
//   user.password = hash
//   next()
// })
//
// UserSchema.methods.validPassword = function(password) {
//   return bcrypt.compareSync(password, this.password)
// }
//
// UserSchema.options.toJSON = {
//   transform: function(doc, ret, options) {
//     delete ret.password
//     return ret
//   }
// }

module.exports = mongoose.model("User", UserSchema)
