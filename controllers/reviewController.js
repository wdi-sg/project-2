const cloudinary = require('cloudinary');
require('../config/cloudinary');

module.exports.add = function(req, res) {
  res.render('review/add');
};


module.exports.addPost = function(req, res) {
  // cloudinary.uploader.upload(req.file.path, function(result) {
  // });
  // console.log(req.file.filename);
  console.log(req.body);
  req.flash("green", "Review successfully created");
  res.redirect('/profile');
};


module.exports.edit = function(req, res) {
  res.render('review/edit');
};


module.exports.editPost = function(req, res) {
  req.flash("green", "Review successfully edited");
  res.redirect('/review');
};


module.exports.delete = function(req, res) {
  res.sendStatus(200);
};
