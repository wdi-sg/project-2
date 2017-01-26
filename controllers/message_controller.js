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
      let newRecipient = ''
      if (chatbox.firstuser.equals(req.user.id)) {
        newRecipient = chatbox.seconduser
      } else {
        newRecipient = chatbox.firstuser
      }
      Message.create({
        content: req.body.content,
        chatbox: req.params.id,
        sender: req.user.id,
        recipient: newRecipient,
        read: false
      }, (err, message) => {
        console.log('message', message)
        global.io.emit(`chatmessages${req.params.id}`, message)
        res.redirect(`/user/message/${req.params.id}`)
      })
    })
  },
  list: (req, res) => {
    Message.find({chatbox: req.params.id}).populate('chatbox').exec((err, messages) => {
      Message.update({recipient: req.user.id, chatbox: req.params.id},
          {$set: {read: true}},
          {multi: true}
        ).exec(res.render('message/show', {messages: messages, user: req.user, req: req}))

    })
  }
}

module.exports = messageController

//
