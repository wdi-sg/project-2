const Project = require("../models/project")
const User = require("../models/user")
const Message = require("../models/message")
const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
  if (!req.user.project) res.redirect("/manageProject")
  else {
    Message.find({ projectId: req.user.projectId })
      .sort({ date: -1 })
      .limit(10)
      .then(messages => {
        messages.reverse()
        res.render("board/mainBoard", { messages })
      })
  }
})

module.exports = router
