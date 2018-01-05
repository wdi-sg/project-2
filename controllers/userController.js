// models
const SearchList = require('../models/searchList');
const AnalyzedList = require('../models/analyzedList');
const User = require('../models/user');


// read results from database, searchList and analyzedList
exports.result = (req, res) => {
  SearchList.find({username: req.params.id})
  .populate('username')
  .exec((err, searchResult) => {
    if (err) console.log(err);

    AnalyzedList.find({username: req.params.id})
    .populate('username')
    .exec((err, analyzedResult) => {
      if (err) console.log(err);

      res.render('savedResults', {'searchList': searchResult, 'analyzedList': analyzedResult});
    });
  });
};


// read user information from database, user
exports.profile = (req, res) => {
  User.findOne({_id: req.params.id}, (err, result) => {
    if (err) console.log(err);
    res.render('profile', result);
  });
};


// update user information to database, user
// use mongoose save method instead of update method as mongoose middleware to hash password is only invoked on save method
exports.change = (req, res) => {
  // express validator to check profile form fields
  req.checkBody('firstName', 'First name cannot be empty.').notEmpty();
  req.checkBody('lastName', 'Last name cannot be empty.').notEmpty();
  req.checkBody('email', 'Email cannot be empty.').notEmpty();
  req.checkBody('username', 'Username cannot be empty.').notEmpty();
  req.checkBody('password', 'Password cannot be empty.').notEmpty();
  req.checkBody('passwordConfirm', 'Confirm your password again.').notEmpty();
  req.checkBody('password', 'Passwords entered are not the same.').equals(req.body.passwordConfirm);

  let errors = req.validationErrors();
  if (errors) {
    res.render('profile', {'errors': errors});
  } else {
    User.findOne({_id: req.params.id}, (err, result) => {
      // console.log(result);
      if (err) console.log(err);

      result.firstName = req.body.firstName;
      result.lastName = req.body.lastName;
      result.email = req.body.email;
      result.username = req.body.username;
      result.password = req.body.password;
      // validate password and cannot be empty field

      result.save((err, updatedResult) => {
        if (err) console.log(err);
        // console.log(updatedResult);
        req.flash('success', 'Credentials saved.');
        res.redirect('/profile/' + req.params.id);
      });
    });
  }
};


// delete search and analyzed data from database, searchList and analyzedList, through ajax request
exports.deleteSearch = (req, res) => {
  let query = {_id: req.params.id};
  // console.log(query);
  SearchList.remove(query, (err) => {
    if (err) console.log(err);
    console.log("deleted from searchList");
  });
};

exports.deleteAnalyzed = (req, res) => {
  let query = {_id: req.params.id};
  // console.log(query);
  AnalyzedList.remove(query, (err) => {
    if (err) console.log(err);
    console.log("deleted from analyzedList");
  });
};
