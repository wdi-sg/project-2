const Project = require("../models/project")
const User = require("../models/user")
const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
  res.render("board/mainBoard")
})

module.exports = router
