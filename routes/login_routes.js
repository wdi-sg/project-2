const User = require("../models/user")
const express = require("express")
const router = express.Router()
const passport = require("../config/ppConfig.js")

router.get("/", (req, res) => {
	res.render("users/login")
})

router.post("/", passport.authenticate("local", {
	successRedirect: "/profile",
	failureRedirect: "/login"
}))

module.exports = router
