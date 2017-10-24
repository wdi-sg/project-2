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
	// create user slug
	user.slug = user.name.toLowerCase().split(" ").join("_")

	bcrypt.hash(user.password, 10)
		.then(hash => {
			user.password = hash
			next()
		})
})

const User = mongoose.model("User", userSchema)


module.exports = User
