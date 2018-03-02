// models
const SearchList = require('../models/searchList');
const AnalyzedList = require('../models/analyzedList');
const SavedList = require('../models/savedList');
const User = require('../models/user');

const asyncP = require('async-promises');


// read results from database, searchList and analyzedList
exports.result = (req, res) => {
  // SearchList.find({username: req.params.id})
  // .populate('username')
  // .exec((err, searchResult) => {
  //   if (err) console.log(err);

  AnalyzedList.find({username: res.locals.currentUser._id})
  .populate('username')
  .exec((err, analyzedResult) => {
    if (err) console.log(err);

    SavedList.find({username: res.locals.currentUser._id})
    .populate('username')
    .exec((err, savedResult) => {
      if (err) console.log(err);

      res.render('savedResults', {'analyzedList': analyzedResult, 'savedList': savedResult});
    });
  });
  // });

  // var searchArray = [AnalyzedList, SavedList];
  // var resultObject = {};
  // return asyncP.each(searchArray, (entry) => {
  //   return new Promise((resolve) => {
  //     entry.find({username: res.locals.currentUser._id})
  //     .populate('username')
  //     .exec((err, result) => {
  //       console.log("1");
  //       if (err) console.log(err);
  //       resultObject[entry] = result;
  //       resolve();
  //     });
  //   });
  // }).then(() => {
  //   console.log("2");
  //   console.log(resultObject);
  //   res.json(resultObject);
  // });
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


// delete search and analyzed data from database, searchList, analyzedList and savedList, through ajax request
exports.deleteSearch = (req, res) => {
  let query = {_id: req.params.id};
  // console.log(query);
  SearchList.remove(query, (err) => {
    if (err) console.log(err);
    console.log("deleted from searchList");
    res.sendStatus(200);
  });
};

exports.deleteAnalyzed = (req, res) => {
  let query = {_id: req.params.id};
  // console.log(query);
  AnalyzedList.remove(query, (err) => {
    if (err) console.log(err);
    console.log("deleted from analyzedList");
    res.sendStatus(200);
  });
};

exports.deleteSaved = (req, res) => {
  let query = {_id: req.params.id};
  // console.log(query);
  SavedList.remove(query, (err) => {
    if (err) console.log(err);
    console.log("deleted from savedList");
    res.sendStatus(200);
  });
};


// create, save combinations which user chooses
exports.saveAnalyzed = (req, res) => {
  // console.log(req.params.id);
  // console.log(req.body);
  SavedList.findOne({username: req.params.id, item: req.body.item}, (err, data) => {
    if (err) console.log(err);
    if (data) {
      // add to database if entry is already in database

      // check to see if combination is already present
      var logic = false;
      for (var index = 0; index < data.result.length; index++) {
        if (data.result[index].range == req.body.range) {
          logic = true;
        }
      }
      console.log(logic);
      if (!logic) {
        data.result.push({'sortedList': req.body.sortedList, 'range': req.body.range});

        data.save((err, updatedData) => {
          if (err) console.log(err);
          console.log(updatedData);
        });
      }
    } else {
      // create list if entry is not in database
      SavedList.create({
        item: req.body.item,
        result: {'sortedList': req.body.sortedList, 'range': req.body.range},
        username: req.params.id
      });
    }
  });
  res.sendStatus(200);
};


// update or delete combinations which user chooses
exports.updateAnalyzed = (req, res) => {
  SavedList.findOne({username: req.params.id, item: req.body.item}, (err, data) => {
    // console.log(req.params.id);
    // console.log(req.body.item);
    if (err) console.log(err);
    console.log(data);

    // delete entry completely if there is only one saved result
    if (data.result.length === 1 && data.result[0].range == req.body.range) {
      SavedList.remove({item: req.body.item}, (err) => {
        if (err) console.log(err);
        console.log("item deleted");
      });
    } else {
      // splice the result if there is more than one saved result
      var spliceIndex;
      for (var index = 0; index < data.result.length; index++) {
        if (data.result[index].range == req.body.range) {
          spliceIndex = index;
        }
      }
      data.result.splice(spliceIndex, 1);

      data.save((err, updatedData) => {
        if (err) console.log(err);
        console.log(updatedData);
      });
    }
  });
  res.sendStatus(200);
};
