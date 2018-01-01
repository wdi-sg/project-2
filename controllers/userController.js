const SearchList = require('../models/searchList');
const AnalyzedList = require('../models/analyzedList');

exports.results = (req, res) => {
  SearchList.find({}, (err, result) => {
    if (err) console.log(err);
    // console.log(result);
    res.render('savedResults', {'list': result});
  });
};

exports.analysis = (req, res) => {
  AnalyzedList.find({}, (err, result) => {
    if (err) console.log(err);
    console.log(result);
    res.render('savedAnalysis', {'list': result});
  });
};
