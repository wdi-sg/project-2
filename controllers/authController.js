const User = require('../models/user')
const passport = require('../helpers/ppInformation')

exports.login = (req, res) => {
  res.render('users/login')
}

exports.register = (req, res) => {
  res.render('users/register')
}

//post Register
exports.signup = (req, res) => {
  // express validator to check registration form fields
  req.checkBody('name', 'First name cannot be empty.').notEmpty()
  req.checkBody('email', 'Email cannot be empty.').notEmpty()
  req.checkBody('password', 'Password cannot be empty.').notEmpty()
  // req.checkBody('password', 'Passwords entered are not the same.').equals(req.body.passwordConfirm);

  let errors = req.validationErrors();
  if (errors) {
    req.flash('error', 'Error cannot create account');
    res.render('users/register');
  } else {
    // create account in database, user
    User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }, (err, createdUser) => {
      if (err) throw err;
        // after account successfully created, authenticate user
        req.flash('success', 'Account created');
        res.redirect('/');
        // passport.authenticate('local', {
        //   successRedirect: '/',
        //   successFlash: 'Account creation successful!',
        // })(req, res);
        // res.send('OK');
      });
    }
  };
