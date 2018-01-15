const User = require("../models/user")
const express = require("express")
const router = express.Router()
const passport = require("../config/ppConfig.js")

// set GET route for /register
router.get("/", (req, res) => {
	// res.send("Register")
	res.render("users/register")
})

router.post("/", (req, res) => {
	// res.send("form submitted")
// 	res.send(req.body)
// })
	var formData = req.body
	var newUser = new User({
		name: formData.user.name,
		email: formData.user.email,
		password: formData.user.password
	})

	newUser.save() // save the object that was created
		.then(
			user => {
				// UPDATE 23 Oct
				// we won't handle this ourselves
				// we'll let passport handle this for us

				// res.redirect(`/profile/${user.slug}`)

				passport.authenticate("local", {
					successRedirect: "/profile"
				})(req, res)
			},
			// success flow, redirect to profile page
			err => res.send(err) // error flow
		)
})


module.exports = router
