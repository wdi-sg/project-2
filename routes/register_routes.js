const passport = require("../config/ppConfig")
const User = require("../models/user")
const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
  res.render("users/register")
})

router.post("/", (req, res) => {
  let formData = req.body.user

  let newUser = new User({
    name: formData.name,
    email: formData.email,
    password: formData.password
  })

  newUser.save().then(
    user => {
      passport.authenticate("local", {
        successRedirect: "/profile"
      })(req, res)
    },
    err => res.send(err)
  )
})

module.exports = router
