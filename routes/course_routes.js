const express = require("express")
const router = express.Router()

const Thread = require('../models/threads')
const User = require("../models/user")
const Answer = require("../models/answers")
const Admin = require("../models/admin")


const { hasLoggedOut, isLoggedIn } = require('../helpers')



router.get("/courseSearch", (req,res)=>{

res.render("courses/show_course")

})



router.post("/search", (req, res)=>{
  // res.send(req.body.keyword)

  const keyword = req.body.keyword

  Thread.find({
    course: new RegExp(keyword, "i")
  })
  .then(results=>{
    console.log(results);
    res.send(results)
  })
})

module.exports = router
