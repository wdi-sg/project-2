const User = require("../models/user")
const express = require("express")
const router = express.Router()
const passport = require("../config/ppConfig")
const { hasLoggedOut, isLoggedIn } = require("../helpers")
const Books = require("../models/book")

router.get("/", (req, res) => {
  res.render("browse/booksRead")
})

module.exports = router
