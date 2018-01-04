const Review = require('../models/review');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports.like = function(req, res) {

let isFound = false;

  Review.findById(req.params.id, function(err, review) {
    review.like.forEach(function(item) {
      if (item.equals(req.query.userid)) {
        isFound = true;
      }
    });

    if (isFound) {
      req.flash('red', 'User has liked the review');
      res.redirect('/fullreview/' + req.params.id);
    } else {
      Review.findByIdAndUpdate(req.params.id, { $push: { like: req.query.userid }}, function(err, data) {
        if (err) throw err;
        req.flash('blue', 'Likey likey!!');
        res.redirect('/fullreview/' + req.params.id);
      });
    }
  });

};


module.exports.write = function(req, res) {

  // jquery the page
  // add user and comment to db
  // reload with jquery

  req.flash('blue', 'Added comment');
  // res.sendStatus(200);

  res.redirect('/review');
};


module.exports.delete = function(req, res) {
// jquery the delete with commentid
  // find commentid then delete
  // jquery to reload
  res.sendStatus(200);
};
