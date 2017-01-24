const Message = require('../models/message')
const Chatbox = require('../models/chatbox')
const User = require('../models/user')
const messageController = require('./message_controller')

let chatboxController = {

  list: (req, res) => {
    Chatbox.find({$or: [{firstuser: req.user.id}, {firstuser: req.body.id}], $or: [{seconduser: req.user.id}, {seconduser: req.body.id}]}).exec((err, chatboxs) => {
      console.log('chatbox', chatboxs)
      if (!chatboxs || chatboxs.length === 0) {
        Chatbox.create({
          firstuser: req.user.id,
          seconduser: req.body.id
        }, (err, chatbox) => {
          res.redirect(`/user/message/${chatbox._id}`)
        })
      } else {
        res.redirect(`/user/message/${chatboxs[0]._id}`)
      }
    })
  }
}

module.exports = chatboxController

//
