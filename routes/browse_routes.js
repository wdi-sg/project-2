const User = require("../models/user")
const express = require("express")
const router = express.Router()
const passport = require("../config/ppConfig")
const { hasLoggedOut, isLoggedIn } = require("../helpers")
const Books = require("../models/book")

// show /browse
router.get("/", (req, res) => {
  res.render("browse/search")
})

// show /browse/:bookID
router.get("/:_id", (req, res) => {
  // find the book based on :id
  Books.findOne({ _id: req.params._id }).then(book => {
    // find the current user to check readBooks list.
    User.findById(req.user.id).then(user => {
      // comparing
      const checker = user.readBooks.includes(book._id)
      // =================== this portion is not working for books included, example search "w" ================
      console.log(user.readBooks[0])
      console.log(book._id)
      console.log(checker)
      // pass the checker into the view
      res.render("browse/bookDetails", { book, checker: checker })
    })
  })
})

module.exports = router
