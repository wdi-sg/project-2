const Project = require("../models/project")
const User = require("../models/user")
const Task = require("../models/task")
const Message = require("../models/message")
const express = require("express")
const router = express.Router()
const app = express()

router.get("/", (req, res) => {
  if (!req.user.project) res.redirect("/manageProject")
  else {
    let nsp = req.io.of(`/${req.user.projectId}`)
    nsp.on("connection", function(socket) {
      console.log("Connected to unique project ID")
    })
    //displays latest 10 messages from database
    Message.find({ projectId: req.user.projectId })
      .sort({ date: -1 })
      .limit(10)
      .then(messages => {
        messages.reverse()
        Task.find({ projectId: req.user.projectId }).then(tasks => {
          //do task
          res.render("board/mainBoard", { messages, tasks })
        })
      })
  }
})

module.exports = router
