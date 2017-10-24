const Project = require("../models/project")
const User = require("../models/user")
const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
  res.render("board/manageProject")
})

router.put("/", (req, res) => {
  let project = req.body.project
  User.findByIdAndUpdate(req.user.id, {
    project: project.name
  })
    .then(() => {
      res.redirect("/manageProject")
    })
    .catch(err => console.log(err))
})

router.delete("/", (req, res) => {
  User.findByIdAndUpdate(req.user.id, {
    project: ""
  }).then(() => {
    res.redirect("/manageProject")
  })
})

module.exports = router
