const cloudinary = require('cloudinary');
require('../config/cloudinary');

// =============== require module ===============
const Review = require('../models/review');
const helper = require('../helpers/helperFunction');



module.exports.add = function(req, res) {
  res.render('review/add');
};



module.exports.addPost = function(req, res) {
  // cloudinary.uploader.upload(req.file.path, function(result) {
  // });
let quality = parseInt(req.body.quality);
let quantity = parseInt(req.body.quantity);
let price = parseInt(req.body.price);
let overall = helper.getOverall(quality, quantity, price);

let newReview = new Review({
  title: req.body.title,
  review: req.body.review,
  photo: req.file.filename,
  location: req.body.location,
  date: helper.getDate(),
  rating: {
    quality: quality,
    quantity: quantity,
    price: price,
    overall: overall
  },
  userId: '5a4b9184d3eb105a222cc3dc'
});

console.log(newReview);

newReview.save(function(err) {
  if (err) throw err;
  req.flash("green", "Review successfully created");
  res.redirect('/profile');
});

};



module.exports.edit = function(req, res) {
// find reviewid send to page
Review.findById(req.params.id, function(err, result) {
  if (err) throw err;
  res.render('review/edit', {data: result});
});
};



module.exports.editPost = function(req, res) {

let quality = parseInt(req.body.quality);
let quantity = parseInt(req.body.quantity);
let price = parseInt(req.body.price);
let overall = helper.getOverall(quality, quantity, price);

Review.findByIdAndUpdate(req.params.id, { $set: {
  title: req.body.title,
  location: req.body.location,
  review: req.body.review,
  rating: {
    quality: quality,
    quantity: quantity,
    price: price,
    overall: overall
  }
}}, function(err) {
  req.flash("green", "Review successfully edited");
  res.redirect('/fullreview/' + req.params.id);
});

};



module.exports.delete = function(req, res) {
  res.sendStatus(200);
};
