// models
const SearchList = require('../models/searchList');
const AnalyzedList = require('../models/analyzedList');
const User = require('../models/user');

// read results from database
exports.result = (req, res) => {
  SearchList.find({}, (err, searchResult) => {
    if (err) console.log(err);

    AnalyzedList.find({}, (err, analyzedResult) => {
      if (err) console.log(err);

      res.render('savedResults', {'searchList': searchResult, 'analyzedList': analyzedResult});
    });
  });
};

exports.profile = (req, res) => {
  User.findOne({username: req.params.id}, (err, result) => {
    if (err) console.log(err);
    res.render('profile', result);
  });
};

exports.access = (req, res) => {
  res.send("Please login first");
};
