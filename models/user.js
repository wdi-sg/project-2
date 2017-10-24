const mongoose = require("mongoose")
const Schema = mongoose.Schema

// require bcrypt
const bcrypt = require("bcrypt")

const userSchema = new Schema ({
	name: String,
	email: String,
	password: String
})

// hash password with bcrypt
userSchema.pre("save", function(next) {
	var user = this

	bcrypt.hash(user.password, 10)
		.then(hash => {
			user.password = hash
			// console.log("pre save flow", user)
			next()
		})
})

userSchema.methods.validPassword = function(plainPassword, callback) {
	bcrypt.compare(plainPassword, this.password, callback)
}


const User = mongoose.model("User", userSchema)


module.exports = User
