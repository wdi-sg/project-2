const User = require("../models/user")
const express = require("express")
const router = express.Router()
const passport = require("../config/ppConfig")
const { hasLoggedOut, isLoggedIn } = require("../helpers")
const Book = require("../models/book")
const Comment = require("../models/comment")

// show /browse
router.get("/", (req, res) => {
  res.render("browse/search")
})

// show /browse/:bookID
router.get("/:_id", (req, res) => {
  console.log("Entered!!")
  // find the book based on :id
  Book.findOne({ _id: req.params._id }).then(book => {
    // find the current user to check readBooks list.
    User.findById(req.user.id).then(user => {
      // comparing
      const bookReadChecker = user.readBooks.find(
        e => JSON.stringify(e) === JSON.stringify(book._id)
      )
      // const comments = []
      //
      Comment.find({
        book_id: book._id,
        author: user._id
      }).then(comments => {
        res.render("./browse/bookDetails", { book, bookReadChecker, comments })
      })
      // .then(comments => console.log(comments))
      // pass the bookReadChecker into the view
    })
  })
})

module.exports = router
