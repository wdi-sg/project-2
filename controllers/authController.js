// model
const User = require('../models/user');

const passport = require('../helpers/passportInfo');

exports.login = (req, res) => {
  res.render('login');
};

exports.register = (req, res) => {
  res.render('register');
};

exports.signup = (req, res) => {
  // express validator to check registration form fields
  req.checkBody('firstName', 'First name cannot be empty.').notEmpty();
  req.checkBody('lastName', 'Last name cannot be empty.').notEmpty();
  req.checkBody('email', 'Email cannot be empty.').notEmpty();
  req.checkBody('username', 'Username cannot be empty.').notEmpty();
  req.checkBody('password', 'Password cannot be empty.').notEmpty();
  req.checkBody('passwordConfirm', 'Confirm your password again.').notEmpty();
  req.checkBody('password', 'Passwords entered are not the same.').equals(req.body.passwordConfirm);

  let errors = req.validationErrors();
  if (errors) {
    res.render('register', {'errors': errors});
  } else {
    // create account in database, user
    User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    }, (err, createdUser) => {
      if (err) {
        req.flash('error', 'Could not create user account.');
        res.redirect('/register');
      } else {
        // after account successfully created, authenticate user
        passport.authenticate('local', {
          successRedirect: '/',
          successFlash: 'Welcome! Account created.',
        })(req, res);
      }
    });
  }
};

exports.logout = (req, res) => {
  req.logout();
  req.flash('error', 'You are now logged out!');
  res.redirect('/login');
};
