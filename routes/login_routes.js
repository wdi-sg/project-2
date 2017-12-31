const User = require("../models/user")
const express = require("express")
const passport = require("../config/ppConfig")
const router = express.Router()

router.get("/", (req, res) => {
  res.render("users/login")
})

router.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
  })
)

module.exports = router
