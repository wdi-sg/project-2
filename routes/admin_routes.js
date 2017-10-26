const express = require("express")
const passport = require("../config/ppConfig")
const router = express.Router()
const adminCC = process.env.ADMIN_CODE

const Thread = require('../models/threads')
const Admin = require("../models/admin")
const Answer = require("../models/answers")
const User = require("../models/user")


const { hasLoggedOut, isLoggedIn, isAdmin, isAdminLoggedIn } = require('../helpers')


router.get("/",isAdminLoggedIn, (req,res)=>{
res.render("admin/admin_landingpage",{
  title: "Admin Access"
})

})

router.get("/console",isAdmin, (req,res)=>{
  User.find()
  .then(usersFound=>{
    res.render("admin/admin_console",{
      title: "Admin Console",
      users: usersFound
    })
  })

})

router.post("/login", passport.authenticate("local_admin",{
  successRedirect: "/admin/console",
  failureRedirect: "/admin",
  failureFlash: 'Invalid Username/Password',
  successFlash: 'Admin Succesfully Logged In'
}))

router.post("/register", (req,res)=>{
  if(req.body.adminCode !== adminCC ){
    req.flash("error","Invalid Admin Code entered!")
    res.redirect("/admin")
  }
let newAdmin = new Admin({
  name: req.body.name,
  email: req.body.email,
  password: req.body.password,
  adminCode: req.body.adminCode
})

newAdmin.save()
.then(()=>{
  req.flash("success", "Please login with your credentials to access the admin console")
  res.redirect("/admin")
})
})

module.exports = router
