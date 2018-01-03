const Review = require('../models/review');
const User = require('../models/user');


module.exports.home = function(req, res) {
Review.find({}, function(err, result) {
if (err) throw err;
console.log(result);
    res.render('base/home', {data: result});
});
  // find review and send to home


};

module.exports.profile = function(req, res) {

// place userid at navbar
// find userid and send info to profile page

  res.render('base/profile');
};

module.exports.review = function(req, res) {
// place reviewid on review home page individual review
// find reviewid send to full review page
// console.log(req.params.id);
Review.findById(req.params.id).populate('userId').exec(function(err, result) {
  if (err) throw err;
  // console.log(result);
    res.render('base/review', {data: result});
});


};
