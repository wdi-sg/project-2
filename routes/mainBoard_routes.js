const Project = require("../models/project")
const User = require("../models/user")
const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
  res.render("board/mainBoard")
})

// router.post("/", (req, res) => {
//   let formData = req.body
//   console.log("clicked")
//   console.log(formData)
//   // res.send(req.body)
// })

module.exports = router
