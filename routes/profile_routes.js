const User = require("../models/user")
const express = require("express")
const router = express.Router()

router.get("/profile", (req, res) => {
	res.render("/profile")
})

router.post("/profile", (req, res) => {
	res.render("/profile")
})

module.exports = router
