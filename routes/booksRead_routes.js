const User = require("../models/user")
const express = require("express")
const router = express.Router()
// const passport = require("../config/ppConfig")
// const { hasLoggedOut, isLoggedIn } = require("../helpers")
const Books = require("../models/book")
const Comment = require("../models/comment")

// Show all books read by user
router.get("/", (req, res) => {
  User.findById(req.user.id)
    .populate("readBooks")
    .then(result => {
      res.render("browse/booksRead", { readBooks: result.readBooks })
    })
})

router.delete("/deleteComment", (req, res) => {
  Comment.findByIdAndRemove(req.body.commentId)
    // .then(() => res.redirect(`/`))
    .catch(err => console.log(err))
})

module.exports = router
