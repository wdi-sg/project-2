const bcrypt = require('bcrypt');
const passport = require('passport');

const User = require('../models/user');
const helper = require('../helpers/helperFunction')
const saltRounds = 10;

module.exports.logout = function(req, res) {
  req.logout();
  req.flash('green', 'See you again');
  res.redirect('/login');
};



module.exports.login = function(req, res) {
  res.render('auth/login');
};



module.exports.loginPost = function(req, res, next) {
  passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash:  true,
      successFlash: 'Welcome'
    })(req, res, next);
};



module.exports.signup = function(req, res) {
  res.render('auth/signup');
};



module.exports.signupPost = function(req, res) {
  req.checkBody('firstname', 'Firstname is required').notEmpty();
  req.checkBody('lastname', 'Lastname is required').notEmpty();
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('passwordConfirm', 'Password does not match').equals(req.body.password);

  let errors = req.validationErrors();

  if (errors) {
    res.render('auth/signup', {
      errors: errors,
      data: req.body
    });
  } else {
let newUser = new User({
  firstname: req.body.firstname,
  lastname: req.body.lastname,
  username: req.body.username,
  email: req.body.email,
  password: req.body.password,
  profilePic: helper.randomProfile()
});

  bcrypt.hash(newUser.password, saltRounds, function(err, hash) {
    if (err) throw err;
  newUser.password = hash;
  newUser.save(function(err, saved) {
    if (err) throw err;
    req.flash('green', 'User has been created');
    res.redirect('/login');
  });
});
}
};
