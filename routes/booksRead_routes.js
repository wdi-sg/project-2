const User = require("../models/user")
const express = require("express")
const router = express.Router()
// const passport = require("../config/ppConfig")
// const { hasLoggedOut, isLoggedIn } = require("../helpers")
const Books = require("../models/book")

// Show all books read by user
router.get("/", (req, res) => {
  var readBooks = req.user.readBooks
  User.findById(req.user.id)
    .populate("readBooks")
    .then(result => {
      res.render("browse/booksRead", { readBooks: result.readBooks })
    })
})

module.exports = router
