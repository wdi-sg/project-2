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
  if(formData.email === "" || formData.name === "" ){
    req.flash("error","Name and Email is required for signup")
    res.redirect("/landingpage")
  }else if(formData.passwordCfm !== formData.password){
    req.flash("error","Passwords do not match, please try again")
    res.redirect("/landingpage")
  }else{
    User.find({email: formData.email}).count()
    .then(result=>{
      if(result === 0){
        let newUser = new User({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          course: formData.dropdown
        })

        newUser.save()
        .then(user=>{
          req.flash("success","Registration Successful, Please login with your credentials")
          res.redirect(`/landingpage`)
        })
      }else{
        req.flash("error","Email already in use, please try again")
        res.redirect("/landingpage")
      }
    })
  }

  // var formData = req.body // if this is modified, change the landingpage fields as well as ppConfig
  // let newUser = new User({
  //   name: formData.name,
  //   email: formData.email,
  //   password: formData.password
  // })
  //
  // newUser.save()
  // .then(user=>{
  //   res.redirect(`/profile`)
  // })
})

router.post("/login", passport.authenticate("local",{
  successRedirect: "/",
  failureRedirect: "/landingPage",
  failureFlash: 'Invalid Username/Password',
  successFlash: 'Succesfully Logged In'
}))


module.exports= router
