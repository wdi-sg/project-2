const passport = require('../config/ppConfig')
const User = require('../models/user')
const Event = require('../models/event')
const Participant = require('../models/participant')
const Chatbox = require('../models/chatbox')
const Message = require('../models/message')
const cloudinary = require('cloudinary')
const async = require('async')

let userController = {
  signup: (req, res) => {
    res.render('user/signup', {user: req.user})
  },
  create: function (req, res) {
    User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }, function (err, user) {
      if (err) {
        req.flash('error', 'Could not create user.')
        res.redirect('/user/signup')
      } else {
        passport.authenticate('local', {
          successRedirect: '/user/profile',
          successFlash: `Welcome to Kakis!`
        })(req, res)
      }
    })
  },
  show: (req, res) => {
    async.parallel([
      (cb) => {
        User.findById(req.user.id, cb)
      },
      (cb) => {
        Event.find({creator: req.user.id, endDate: {$gt: Date.now()}}).exec(cb)
      },
      (cb) => {
        Participant.find({user: req.user.id}).populate({
          path: 'event',
          match: {
            endDate: {$gt: Date.now()}
          }
        }).exec(cb)
      },
      (cb) => {
        Event.find({startDate: {$gte: Date.now()}, creator: {$ne: req.user.id}, vacancy: {$ne: 0}}).populate('creator').sort({'created_at': -1}).limit(5).exec(cb)
      },
      (cb) => {
        Chatbox.find({ $or: [{firstuser: req.user.id}, {seconduser: req.user.id}]})
        .populate('firstuser')
        .populate('seconduser')
        .exec(cb)
      },
      (cb) => {
        Message.find({recipient: req.user.id, read: false}, cb)
      }
    ], (err, result) => {
      if (err) {
        req.flash('error', 'Please login to proceed.')
        res.redirect('/auth/login')
      } else {
        res.render(`user/index`, {user: req.user, events: result})
      }
    })
  },
  avatar: (req, res) => {
    res.render('dummy', {user: req.user})
  },
  update: (req, res) => {
    if (req.file) {
      cloudinary.uploader.upload(req.file.path, function (result) {
        User.findOneAndUpdate({_id: req.user.id}, {
          name: req.body.name,
          email: req.body.email,
          age: req.body.age,
          motor: req.body.motor,
          gender: req.body.gender,
          avatar: result.public_id

        }, (err, user) => {
          res.redirect('/user/profile')
        })
      })
    } else {
      User.findOneAndUpdate({_id: req.user.id}, {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        motor: req.body.motor,
        gender: req.body.gender
      }, (err, user) => {
        res.redirect('/user/profile')
      })
    }
  },
  delete: (req, res) => {
    User.findByIdAndRemove(req.user.id, (err) => {
      if (err) {
        req.flash('error', 'Unable to delete user.')
        res.redirect('/user/profile')
      } else {
        req.flash('success', 'User has been removed.')
        res.redirect('/')
      }
    })
  },
  edit: (req, res) => {
    res.render('user/edit', {user: req.user})
  },
  profile: (req, res) => {
    if (req.user && req.body.id === req.user.id) {
      res.redirect('/user/profile')
      return
    }
    async.parallel({
      friend: (cb) => {
        User.findOne({_id: req.body.id}, cb)
      },
      events: (cb) => {
        Event.find({creator: req.body.id, endDate: {$gt: Date.now()}}, cb)
      }
    }, (err, results) => {
      if (err) {
        req.flash('error', 'User not Found')
        res.redirect('/user/profile')
        return
      }
      res.render('user/otherprofile', {user: req.user, results: results})
    })

  }
}

module.exports = userController
