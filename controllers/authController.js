const User = require('../models/user');


module.exports.logout = function(req, res) {
  req.flash('green', 'See you again');
  res.redirect('/login');
};


module.exports.login = function(req, res) {

  res.render('auth/login');
};


module.exports.loginPost = function(req, res) {

// change the user
  req.flash('green', 'Welcome User');
  res.redirect('/');
};


module.exports.signup = function(req, res) {
  res.render('auth/signup');
};


module.exports.signupPost = function(req, res) {

  req.checkBody('firstname', 'Firstname is required').notEmpty();
  req.checkBody('lastname', 'Lastname is required').notEmpty();
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Enter a valid email').isEmail();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('passwordConfirm', 'Password does not match').equals(req.body.password);

  let errors = req.validationErrors();

  if (errors) {
    res.render('auth/signup', {
      errors: errors
    });
  } else {

    console.log(req.body);
    User.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      },
      function(err, saved) {
        if (err) throw err;
        console.log(saved);
        req.flash('green', req.body.username + ' has been created');
        res.redirect('/login');
      });

  }



};
