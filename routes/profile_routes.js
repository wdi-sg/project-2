const User = require("../models/user")
const express = require("express")
const router = express.Router()
const passport = require("../config/ppConfig")

router.get("/", isLoggedIn, function(req, res) {
  res.render("users/profile")
})

router.put("/", (req, res) => {
  var formData = req.body
  User.findByIdAndUpdate(req.user.id, {
    name: formData.username,
    email: formData.email
  }).then(() => {
    res.redirect("/profile")
  })
})

router.delete("/", (req, res) => {
  User.findByIdAndRemove(req.user.id)
    .then(() => res.redirect(`/`))
    .catch(err => console.log(err))
})

function isLoggedIn(req, res, next) {
  if (req.user) return next()
  res.redirect("/")
}

module.exports = router
