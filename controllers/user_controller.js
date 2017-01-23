const passport = require('../config/ppConfig')
const User = require('../models/user')
const Event = require('../models/event')
const Participant = require('../models/participant')
const async = require('async')

let userController = {
  signup: (req, res) => {
    res.render('user/signup', {user: req.user})
  },
  create: function (req, res) {
    console.log(req)
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
          successFlash: `Welcome to Bfit ${user.name}!`
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
        Event.find({creator: req.user.id, endDate: {$gt: Date.now()}}, cb)
      },
      (cb) => {
        Participant.find({user: req.user.id}).populate('event').exec(cb)
      },
      (cb) => {
        Event.find({startDate: {$gte: Date.now()}}).sort({'created_at': -1}).limit(5).exec(cb)
      }

    ]

    , (err, result) => {
      console.log(result)
      console.log('result 2', result[2])
      if (err) {
        req.flash('error', 'Please login to proceed.')
        res.redirect('/auth/login')
      } else {
        res.render(`user/index`, {user: req.user, events: result})
      }
    })
  },
    // User.findById(req.user.id)
    // .populate('joined_events')
    // .populate('my_events')
    // .populate('past_events')
    // .exec((err, user) => {
    //   if (err) {
    //     req.flash('error', 'Please login to proceed.')
    //     res.redirect('/auth/login')
    //   } else {
    //     res.render(`user/index`, {user: user})
    //   }
    // })

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
  }
}

module.exports = userController
