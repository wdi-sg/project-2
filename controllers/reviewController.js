const cloudinary = require('cloudinary');
require('../config/cloudinary');

// =============== require module ===============
const Review = require('../models/review');
const getDate = require('../helpers/date');

module.exports.add = function(req, res) {
  res.render('review/add');
};


module.exports.addPost = function(req, res) {
  // cloudinary.uploader.upload(req.file.path, function(result) {
  // });
let quality = parseInt(req.body.quality);
let quantity = parseInt(req.body.quantity);
let price = parseInt(req.body.price);
let overall = (quality + quantity + price) / 3;
overall = overall.toFixed(1);


let newReview = new Review({
  title: req.body.title,
  review: req.body.review,
  photo: req.file.filename,
  location: req.body.location,
  date: getDate,
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

// place reviewid in href
// find reviewid send to page

  res.render('review/edit');
};


module.exports.editPost = function(req, res) {


  req.flash("green", "Review successfully edited");
  res.redirect('/review');
};


module.exports.delete = function(req, res) {
  res.sendStatus(200);
};
