const User = require("../models/user")
const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
	res.render("users/profile",{
		user: req.user
	})
	// res.send(req.user)
})

router.post("/", (req, res) => {
	res.render("users/profile")
})

module.exports = router
