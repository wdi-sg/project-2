const passport = require('../config/ppConfig')

let authController = {
  logIn: (req, res) => {
    res.render('auth/login', {user: req.user}) // view not done
  },
  loggedIn: function (req, res) {
    passport.authenticate('local', {
      successRedirect: `/user/profile`,
      failureRedirect: '/auth/login',
      successFlash: `Welcome Back!`,
      failureFlash: 'Invalid email/password.'
    })(req, res)
  },
  logOut: (req, res) => {
    req.logout()
    req.flash('success', 'You have been logged out.')
    res.redirect('/event')
  }
}

module.exports = authController
