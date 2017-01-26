const User = require('../models/user')
const passport = require('../config/ppConfig')

let authController = {
  getSignUp: function (req, res) {
    res.render('./auth/signup')
  },

  postSignUp: function (req, res) {
    User.create({
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
      userTypes: {
        admin: (req.body.userTypeAdmin === 'true') || false,
        guardian: (req.body.userTypeGuardian === 'true') || false,
        volunteer: (req.body.userTypeVolunteer === 'true') || false
      }
    }, function (err, createdUser) {
      if (err) {
        req.flash('error', err.toString())
        res.redirect('/auth/signup')
      } else {
        passport.authenticate('local', {
          successRedirect: '/program',
          successFlash: 'Account created for ' + req.body.name + ' and logged in'
        })(req, res)
      }
    })
  },

  getLogIn: function (req, res) {
    res.render('./auth/login')
  },

  postLogIn: passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/auth/login',
    failureFlash: 'Invalid username and/or password',
    successFlash: 'You have successfully logged in'
  }),

  getLogOut: function (req, res) {
    req.logout()
    req.flash('success', 'You have successfully logged out. See you soon!')
    res.redirect('/')
  },

  edit: function (req, res) {
    User.findById(req.user.id, function (err, chosenUser) {
      if (err) throw err
      res.render('auth/edit', { chosenUser: chosenUser })
    })
  },

  update: function (req, res) {
    User.findOneAndUpdate({
      _id: req.user.id
    }, {
      email: req.body.email,
      name: req.body.name,
      userTypes: {
        admin: (req.body.userTypeAdmin === 'true') || false,
        guardian: (req.body.userTypeGuardian === 'true') || false,
        volunteer: (req.body.userTypeVolunteer === 'true') || false
      }
    }, { runValidators: true }, function (err, updatedUser) {
      if (err) {
        req.flash('error', err.toString())
        res.redirect('/auth/edit/' + req.user.id)
      } else {
        req.flash('success', 'Profile settings successfully updated!')
        res.redirect('/profile')
      }
    })
  },

  newPassword: function (req, res) {

  },

  delete: function (req, res) {
    User.findByIdAndRemove(req.user.id, function (err, chosenUser) {
      if (err) throw err
      req.flash('success', 'Account successfully deleted')
      res.redirect('/')
    })
  }

}

module.exports = authController
