const User = require("../models/user")
const express = require("express")
const router = express.Router()

// set GET route for /register
router.get("/", (req, res) => {
	// res.send("Register")
	res.render("users/register")
})

router.post("/", (req, res) => {
	// res.send("form submitted")
	var formData = req.body
	var newUser = new User({
		name: formData.name,
		email: formData.email,
		password: formData.password
	})

	newUser.save()
		.then(
			user =>
				res.redirect("/profile"),
			err => res.send(err)
		)
})


module.exports = router
