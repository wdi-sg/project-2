const passport = require('../config/ppConfig')
const User = require('../models/user')

let userController = {
  signup: (req, res) => {
    res.render('user/signup', {user: req.user})
  },
  create: function (req, res) {
    console.log(req);
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
  index: (req, res) => {
    User.findById(req.user.id, (err, user) => {
      if (err) {
        req.flash('error', 'Please login to proceed.')
        res.redirect('/auth/login')
      } else {
        res.render('user/index', {user: req.user})
      }
    })
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
  }
}

module.exports = userController
