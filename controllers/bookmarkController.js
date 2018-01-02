module.exports.add = function(req, res) {
  // place reviewid on bookmark link
  // title
  // location
  // photo
  // userid
  // reviewid

  // add to db

  req.flash('light-blue', 'Bookmark added');
  res.redirect('/review');
};


// module.exports.edit = function(req, res) {
//   res.redirect('base/profile');
// };


module.exports.delete = function(req, res) {
  // find bookmarkid and delete
  res.sendStatus(200);
};
