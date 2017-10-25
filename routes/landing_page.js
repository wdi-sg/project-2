const express = require("express")
const router = express.Router()
const passport = require("../config/ppConfig")

const User = require("../models/user")
const { hasLoggedOut, isLoggedIn } = require('../helpers')

router.get("/",isLoggedIn,(req,res)=>{
  res.render("user/landingpage",{
    title: "User Login"
  })
})

router.post("/register", (req,res)=>{
  var formData = req.body // if this is modified, change the landingpage fields as well as ppConfig
  let newUser = new User({
    name: formData.name,
    email: formData.email,
    password: formData.password
  })

  newUser.save()
  .then(user=>{
    res.redirect(`/profile`)
  })
})

router.post("/login", passport.authenticate("local",{
  successRedirect: "/",
  failureRedirect: "/landingPage"
}))


module.exports= router
