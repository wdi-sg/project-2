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
    Thread.find()
    .then(threadsFound=>{
      Answer.find()
      .then(answersFound=>{
        res.render("admin/admin_console",{
          title: "Admin Console",
          users: usersFound,
          threads: threadsFound,
          answers: answersFound
        })
      })

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
  course: req.body.dropdown,
  adminCode: req.body.adminCode
})

newAdmin.save()
.then(()=>{
  req.flash("success", "Please login with your credentials to access the admin console")
  res.redirect("/admin")
})
})


// THREADS TAB //
router.put("/adminconsole/threads/:id", (req,res)=>{
  Thread.findByIdAndUpdate(req.params.id,{
    question: req.body.question,
    description: req.body.description,
    course: req.body.course,
    creator: req.body.creator,
    totalVotes: req.body.totalVotes
  })
.then(()=>{
  req.flash("success","Thread details updated")
  res.redirect("/admin/console#threadsPage")
})

})

router.delete("/threads/:id", (req,res)=>{
  Thread.findByIdAndRemove(req.params.id)
  .then(()=>{
    req.flash("success","Thread removed")
    res.redirect("/admin/console#threadsPage")
  })
})

// ANSWERS TAB //
router.put("/adminconsole/answers/:id", (req,res)=>{
  Answer.findByIdAndUpdate(req.params.id,{
    description: req.body.description,
    creatorName: req.body.creatorName,
    totalVotes: req.body.totalVotes
  })
.then(()=>{
  req.flash("success",`Parent ID ${req.params.id} details updated`)
  res.redirect("/admin/console#answersPage")
})

})

router.delete("/answers/:id", (req,res)=>{
  Answer.findByIdAndRemove(req.params.id)
  .then(()=>{
  req.flash("success",`Answer from Parent ID ${req.params.id} details updated`)
    res.redirect("/admin/console#answersPage")
  })
})

// DELETE TAB //
router.delete("/deleteAllUsers",(req,res)=>{
  User.remove()
  .then(()=>{
    req.flash("success","All users removed from database")
    res.redirect("/admin/console")
  })
})

router.delete("/deleteAllThreads",(req,res)=>{
  Thread.remove()
  .then(()=>{
    req.flash("success","All threads removed from database")
    res.redirect("/admin/console")
  })
})

router.delete("/deleteAllAnswers",(req,res)=>{
  Answer.remove()
  .then(()=>{
    req.flash("success","All answers removed from database")
    res.redirect("/admin/console")
  })
})
module.exports = router
