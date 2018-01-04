const Review = require('../models/review');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports.like = function(req, res) {

let isFound = false;

  Review.findById(req.params.id, function(err, review) {
    review.like.forEach(function(item) {
      if (item === req.query.username) {
        isFound = true;
      }
    });

    if (isFound) {
      req.flash('red', 'User has liked the review');
      res.redirect('/fullreview/' + req.params.id);
    } else {
      Review.findByIdAndUpdate(req.params.id, { $push: { like: req.query.username }}, function(err, data) {
        if (err) throw err;
        req.flash('blue', 'Likey likey!!');
        res.redirect('/fullreview/' + req.params.id);
      });
    }
  });

};


module.exports.write = function(req, res) {
// review id
  req.params.id
  Review.findByIdAndUpdate(req.params.id, { $push: { comments: {
    username: req.body.username,
    comment: req.body.comment
  }}}, function(err, data) {
    if (err) throw err;
    console.log(data);
      req.flash('blue', 'Added comment');
      res.redirect('/fullreview/' + req.params.id)
  })
  // add user and comment to db
  // reload with jquery


  // res.sendStatus(200);

  // res.redirect('/review');
};


module.exports.delete = function(req, res) {



  Review.findByIdAndUpdate(req.query.reviewId, { $pull: { comments: { _id: req.params.id }}}, function(err, data) {
    if (err) throw err;
    console.log(data);
      res.sendStatus(200);
  })
// jquery the delete with commentid
  // find commentid then delete
  // jquery to reload

};
