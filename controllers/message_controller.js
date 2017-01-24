const Message = require('../models/message')
// const Mail = require('../models/mail')
const User = require('../models/user')

let messageController = {
  new: (req, res) => {
    User.find({}, (err, users) => {
      res.render('message/new', {users: users, user: req.user})
    })
  },
  create: (req, res) => {
    console.log('req.params', req.params);
    Message.create({
      content: req.body.content,
      chatbox: req.params.id,
      sender: req.user.id
    }, (err, message) => {
      console.log(message);
      res.redirect(`/user/message/${req.params.id}`)
    })
  },
  list: (req, res) => {
    Message.find({chatbox: req.params.id}).exec((err, messages) => {
      console.log('Messages', messages)
      res.render('message/show', {messages: messages, user: req.user, req: req})
    })
  }
}

module.exports = messageController

//
