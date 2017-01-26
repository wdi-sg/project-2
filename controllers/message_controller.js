const Message = require('../models/message')
const Chatbox = require('../models/chatbox')
const User = require('../models/user')
const async = require('async')

let messageController = {
  new: (req, res) => {
    User.find({}, (err, users) => {
      res.render('message/new', {users: users, user: req.user})
    })
  },
  create: (req, res) => {
    Chatbox.findOne({_id: req.params.id}, (err, chatbox) => {
      let newrecipient = ''
      if (chatbox.firstuser.equals(req.user.id)) {
        newrecipient = chatbox.seconduser
      } else {
        newrecipient = chatbox.firstuser
      }

      Message.create({
        content: req.body.content,
        chatbox: req.params.id,
        sender: req.user.id,
        recipient: newrecipient,
        read: false
      }, (err, message) => {
        global.io.emit(`chatmessages${req.params.id}`, message)
        res.redirect(`/user/message/${req.params.id}`)
      })
    })
  },
  list: (req, res) => {
    async.parallel({
      messages: (cb) => {
        Message.find({chatbox: req.params.id}).populate('chatbox').exec(cb)
      },
      updateRead: (cb) => {
        Message.find({recipient: req.user.id, read: false})
        .update({read: true}, {multi: true})
        .exec(cb)
      }
    }, (err, results) => {
      res.render('message/show', {messages: results.messages, user: req.user, req: req})
    })
  }
}

module.exports = messageController

//
