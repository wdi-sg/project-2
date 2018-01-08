const cloudinary = require('cloudinary');
require('../config/cloudinary');

// =============== require module ===============
const Review = require('../models/review');
const helper = require('../helpers/helperFunction');



module.exports.add = function(req, res) {
  res.render('review/add');
};



module.exports.addPost = function(req, res) {

  req.checkBody('title', 'Title is required').notEmpty();
  req.checkBody('review', 'Review is required').notEmpty();
  req.checkBody('location', 'Location is required').notEmpty();
  req.checkBody('quality', 'Rating for quality is required').notEmpty();
  req.checkBody('quantity', 'Rating for quantity is required').notEmpty();
  req.checkBody('price', 'Rating for price is required').notEmpty();
  // req.checkBody('photo', 'Please upload a photo').notEmpty();

  let errors = req.validationErrors();

  if (errors) {
    res.send(req.body)
    // res.render('review/add', {
    //   errors: errors
    // });
  } else {
    cloudinary.uploader.upload(req.file.path, function(photo) {

      let quality = parseInt(req.body.quality);
      let quantity = parseInt(req.body.quantity);
      let price = parseInt(req.body.price);
      let overall = helper.getOverall(quality, quantity, price);

      let newReview = new Review({
        title: req.body.title,
        review: req.body.review,
        photo: photo.secure_url,
        location: req.body.location,
        date: helper.getDate(),
        rating: {
          quality: quality,
          quantity: quantity,
          price: price,
          overall: overall
        },
        userId: req.user._id
      });

      console.log(newReview);

      newReview.save(function(err) {
        if (err) throw err;
        req.flash("green", "Review successfully created");
        res.redirect('/profile/' + req.user._id);
      });

    });
  }






};



module.exports.edit = function(req, res) {

  Review.findById(req.params.id, function(err, result) {
    if (err) throw err;
    res.render('review/edit', {
      data: result
    });
  });
};



module.exports.editPost = function(req, res) {

  let quality = parseInt(req.body.quality);
  let quantity = parseInt(req.body.quantity);
  let price = parseInt(req.body.price);
  let overall = helper.getOverall(quality, quantity, price);

  Review.findByIdAndUpdate(req.params.id, {
    $set: {
      title: req.body.title,
      location: req.body.location,
      review: req.body.review,
      rating: {
        quality: quality,
        quantity: quantity,
        price: price,
        overall: overall
      }
    }
  }, function(err) {
    req.flash("green", "Review successfully edited");
    res.redirect('/fullreview/' + req.params.id);
  });

};



module.exports.delete = function(req, res) {
  Review.findByIdAndRemove(req.params.id, function(err, data) {
    if (err) throw err;
    console.log(data);
    res.sendStatus(200);
  });
};
