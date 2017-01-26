const Message = require('../models/message')
const Chatbox = require('../models/chatbox')
const User = require('../models/user')
const messageController = require('./message_controller')

let chatboxController = {

  list: (req, res) => {
    if (req.body.id === req.user.id) {
      res.redirect('/user/profile')
      return
    }
    Chatbox.find({ $or:[ {$and: [{firstuser: req.user.id}, {seconduser: req.body.id}]}, {$and: [{firstuser: req.body.id}, {seconduser: req.user.id}]}]}).exec((err, chatboxs) => {
      console.log('user', req.user.id);
      console.log('req', req.body.id);
      console.log('chatbox', chatboxs)
    //  console.log('chatbox', chatboxs)
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
